import { PrismaClient } from '@prisma/client';
import {
  checkPotExists,
  enterPot,
  leavePot,
} from '../services/deliveryPots.js';
import {
  createMessage,
  getMessagesByPotId,
  readAllMessages,
} from '../services/messages.js';

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
                    some: {
                      id: req.user.id,
                    },
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

    // 2. 방의 모든 메시지 읽음 처리
    await readAllMessages(potId, req.user.id);

    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('updateCountAll', req.user.id);

    // 3. enter pot
    const { pot, alreadyJoined } = await enterPot(potId, req.user.id);

    // 4. 처음 들어가는 방인경우 시스템 메시지 전송, 참여자수 udate
    if (!alreadyJoined) {
      // create system message
      const systemMessage = await createMessage('SYSTEM', potId, req.user.id, {
        message: `${req.user.name}님이 입장했습니다.`,
      });

      // send system message
      io.of('/chat').to(potId.toString()).emit('message', systemMessage);

      // send userlist
      io.of('/room').emit('updateUserList', {
        potId,
        participants: pot._count.participants,
        message: systemMessage,
      });
    }

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

    const result = await leavePot(potId, req.user.id);

    // create system message
    const systemMessage = await createMessage('SYSTEM', potId, req.user.id, {
      message: `${req.user.name}님이 퇴장했습니다.`,
    });

    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', systemMessage);

    // todo : communityId 별로 namesapce 나눠서 보내기
    io.of('/room').emit('updateUserList', {
      potId,
      participants: result._count.participants,
      message: systemMessage,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getPotMasterId(req, res, next) {
  const { potId } = req.params;
  try {
    const potMasterId = await prisma.deliveryPot.findUnique({
      where: { id: +potId },
      select: {
        potMasterId: true,
      },
    });
    res.status(200).json(potMasterId);
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

    // 2. update status
    const pot = await prisma.deliveryPot.update({
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
        post: {
          select: {
            meetingLocation: true,
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
      // todo : set 배달비 to current deiveryFee
      // todo : append pot master's account info
      case 'DEPOSIT_REQUEST':
        if (!pot.potMaster.profile) {
          throw new Error('계좌정보가 입력되지 않았습니다.');
        }
        const { bankName, accountNumber, accountHolderName } =
          pot.potMaster.profile;
        message = `각자 메뉴가격+{배달비} 원씩 보내주세요. ${bankName} ${accountNumber} ${accountHolderName}`;
        break;
      case 'PICKUP_REQUEST':
        message = `배달이 완료되었습니다. ${pot.post.meetingLocation}으로 나와주세요.`;
        break;

      default:
        break;
    }
    const requestMessage = await createMessage('REQUEST', potId, req.user.id, {
      message,
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
    res.status(201).json(requestMessage);
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
    // if (existingPot.closed) {
    //   throw new Error(`already closed`);
    // }

    // 2. close pot
    const pot = await prisma.deliveryPot.update({
      where: { id: +potId },
      data: { closed: true },
    });

    // 3. send updated status
    const io = req.app.get('io');
    io.of('/chat')
      .to(potId.toString())
      .emit('updatePot', { closed: pot.closed });

    res.status(200).json(pot);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
