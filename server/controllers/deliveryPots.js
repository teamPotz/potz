import { PrismaClient } from '@prisma/client';
import { checkPotExists, enterPot } from '../services/deliveryPots.js';
import {
  createMessage,
  getMessagesByPotId,
  readAllMessages,
} from '../services/messages.js';
import {
  getTotalOrderPrice,
  getOrderedUserCount,
  getApplicableDeliveryFeeInfo,
} from '../utils/deliveryCalculator.js';

const prisma = new PrismaClient();

export async function getDeliveryPots(req, res, next) {
  try {
    const deliveryPots = await prisma.deliveryPot.findMany({
      where: { participants: { some: { id: req.user.id } } },
      include: {
        post: {
          select: {
            id: true,
            storeName: true,
            imageUrl: true,
          },
        },
        messages: {
          select: {
            sender: {
              select: { name: true },
            },
            type: true,
            content: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        status: {
          select: {
            id: true,
            status: true,
          },
        },
        _count: {
          select: {
            participants: true,
            messages: {
              where: {
                NOT: {
                  readBy: {
                    some: { id: req.user.id },
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(200).json(deliveryPots);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function joinDeliveryPot(req, res, next) {
  const { potId } = req.params;
  try {
    if (!potId) {
      res.status(400);
      throw new Error('missing potId in request');
    }

    // 1. pot 존재 여부 확인
    const potExists = await checkPotExists(potId);
    if (!potExists) {
      throw new Error(`deliveryPot id #${potId} not found`);
    }

    let pot, alreadyJoined;
    await prisma.$transaction(async (tx) => {
      // 2. enter pot
      ({ pot: pot, alreadyJoined: alreadyJoined } = await enterPot(
        tx,
        potId,
        req.user.id
      ));

      // 3-1. 방의 모든 메시지 읽음 처리
      await readAllMessages(tx, potId, req.user.id);

      // 3-2. 읽음처리 이벤트 전송
      const io = req.app.get('io');
      io.of('/chat').to(potId.toString()).emit('updateCountAll', req.user.id);

      // 4. 처음 들어가는 방인경우 시스템 메시지 전송, 참여자수 udate
      if (!alreadyJoined) {
        // create system message
        const systemMessage = await createMessage(
          tx,
          'SYSTEM',
          potId,
          req.user.id,
          {
            message: `${req.user.name}님이 입장했습니다.`,
          }
        );

        // send system message
        io.of('/chat').to(potId.toString()).emit('message', systemMessage);

        // update chat status
        io.of('/chat')
          .to(potId.toString())
          .emit('updatePot', { _count: pot._count });

        // update userlist
        io.of('/room').emit('updateUserList', {
          potId,
          participants: pot._count.participants,
          message: systemMessage,
        });
      }
    });
    res.status(200).json(pot);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function leaveDeliveryPot(req, res, next) {
  const { potId } = req.params;
  try {
    if (!potId) {
      res.status(400);
      throw new Error('missing potId in request');
    }

    const potExists = await checkPotExists(potId);
    if (!potExists) {
      throw new Error(`deliveryPot id #${potId} not found`);
    }

    let pot, systemMessage;
    await prisma.$transaction(async (tx) => {
      // 1. leave pot
      pot = await tx.deliveryPot.update({
        where: { id: +potId },
        data: {
          participants: {
            disconnect: { id: userId },
          },
        },
        include: {
          _count: {
            select: {
              participants: true,
            },
          },
        },
      });

      // 2. create system message
      systemMessage = await createMessage(tx, 'SYSTEM', potId, req.user.id, {
        message: `${req.user.name}님이 퇴장했습니다.`,
      });
    });

    // send system message
    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', systemMessage);

    // update chat status
    io.of('/chat')
      .to(potId.toString())
      .emit('updatePot', { _count: pot._count });

    // update userlist
    io.of('/room').emit('updateUserList', {
      potId,
      participants: pot._count.participants,
      message: systemMessage,
    });

    res.status(200).json(pot);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getPotMessages(req, res, next) {
  const { potId } = req.params;

  try {
    const messages = await getMessagesByPotId(potId);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function setPotStatus(req, res, next) {
  const { potId } = req.params;
  const { status } = req.body;

  try {
    const existingPot = await prisma.deliveryPot.findUnique({
      where: { id: +potId },
      select: { potMasterId: true, status: true },
    });

    // 1. 존재 여부, 방장여부, 이미 해당 상태인지 확인
    if (!existingPot) {
      throw new Error(`cant find delivery pot #${potId}`);
    }
    if (existingPot.potMasterId !== req.user.id) {
      throw new Error('only pot master can confirm order');
    }
    const alreadyInStatus = existingPot.status?.some(
      (s) => s.status === status
    );
    if (alreadyInStatus) {
      throw new Error(`already in ${status} status`);
    }

    let pot, requestMessage;
    await prisma.$transaction(async (tx) => {
      // 2. update status
      pot = await tx.deliveryPot.update({
        where: { id: +potId },
        data: {
          status: {
            create: {
              status,
            },
          },
        },
        include: {
          status: true,
          participants: { select: { id: true } },
          post: {
            select: {
              storeName: true,
              meetingLocation: true,
              deliveryFees: true,
            },
          },
          orders: {
            select: {
              price: true,
              quantity: true,
              userId: true,
            },
          },
          potMaster: {
            select: {
              profile: {
                select: {
                  accountHolderName: true,
                  accountNumber: true,
                  bankName: true,
                },
              },
            },
          },
        },
      });

      // 4. create request message
      let message;
      switch (status) {
        case 'MENU_REQUEST':
          message = '각자 메뉴를 선택해주세요.';
          break;
        case 'DEPOSIT_REQUEST':
          if (!pot.potMaster.profile) {
            throw new Error('계좌정보가 입력되지 않았습니다.');
          }

          const { bankName, accountNumber, accountHolderName } =
            pot.potMaster.profile;

          // 현재 배달팟에서 주문 신청한 메뉴의 총 가격
          const totalOrderPrice = getTotalOrderPrice(pot.orders);

          // 현재 배달팟에서 주문 신청한 사람 수
          const orderedUserCount = getOrderedUserCount(pot.orders);

          // 적용된 배달비 정보
          const appliedDeliveryFeeInfo = getApplicableDeliveryFeeInfo(
            pot.post.deliveryFees,
            totalOrderPrice
          );

          // 1인당 배달비
          const deliveryFeePerPerson =
            appliedDeliveryFeeInfo?.fee / (orderedUserCount || 1) || 0;

          message = `각자 메뉴가격+배달비(${deliveryFeePerPerson}원) 씩 보내주세요.\n💸${bankName} ${accountNumber} ${accountHolderName}💸`;
          break;
        case 'PICKUP_REQUEST':
          message = `배달이 완료되었습니다.\n${pot.post.meetingLocation}으로 나와주세요.`;
          break;

        default:
          break;
      }

      requestMessage = await createMessage(tx, 'REQUEST', potId, req.user.id, {
        message,
      });

      // 5. notification
      // 5-1. find members in pot(except pot master)
      const members = pot.participants.filter((p) => p.id !== pot.potMasterId);

      if (members.length > 0) {
        // 5-2. create notification
        const noti = await prisma.notification.createMany({
          data: members.map((member) => ({
            type: 'NEW_REQUEST',
            userId: member.id,
            content: {
              potId: +potId,
              storeName: pot.post.storeName,
              status,
            },
          })),
        });
      }
    });

    // send message to chatroom
    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', requestMessage);

    // send message to chatlist
    io.of('/room').emit('updateLastMessage', {
      potId: +potId,
      message: requestMessage,
    });

    // send pot status
    io.of('/room').emit('updateStatus', {
      potId: +potId,
      status: { id: pot.status.id, status },
    });

    console.log('request message sent');
    res.status(201).json(pot);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function cancelPotStatus(req, res, next) {
  const { potId } = req.params;
  const { status } = req.body;

  try {
    const pot = await prisma.deliveryPotStatus.deleteMany({
      // where: { potId: +potId, status },
      where: { potId: +potId },
    });
    res.status(200).json(pot);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function closeDeliveryPot(req, res, next) {
  const { potId } = req.params;

  try {
    // 1. 존재 여부, 방장 여부, 이미 마감됐는지 확인
    const existingPot = await prisma.deliveryPot.findUnique({
      where: { id: +potId },
    });
    if (!existingPot) {
      throw new Error(`cant find delivery pot #${potId}`);
    }
    if (existingPot.potMasterId !== req.user.id) {
      throw new Error('only pot master can confirm order');
    }
    if (existingPot.closed) {
      throw new Error(`already closed`);
    }

    // 2. close pot and create history
    let pot;
    await prisma.$transaction(async (tx) => {
      // 2-1. close pot
      pot = await tx.deliveryPot.update({
        where: { id: +potId },
        data: { closed: true },
        include: {
          deposits: {
            where: {
              depositConfirmed: true,
            },
            select: {
              userId: true,
            },
          },
        },
      });

      // 2-2. create history
      const history = await tx.deliveryPotHistory.create({
        data: {
          potMasterId: pot.potMasterId,
          participants: {
            connect: pot.deposits.map((item) => ({ id: item.userId })),
          },
          deliveryPotId: pot.id,
        },
      });

      console.log(history);
    });

    // 3. send updated status
    const io = req.app.get('io');
    io.of('/chat')
      .to(potId.toString())
      .emit('updatePot', { closed: pot.closed });

    console.log(`pot ${potId} closed`);
    res.status(200).json(pot);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
