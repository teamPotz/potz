import { PrismaClient } from '@prisma/client';
import { createMessage, updateOrderMessage } from '../services/messages.js';

const prisma = new PrismaClient();

export async function createOrder(req, res, next) {
  const { potId, menuName, quantity, price } = req.body;

  try {
    const order = await prisma.deliveryOrder.create({
      data: {
        deliveryPotId: +potId,
        userId: req.user.id,
        imageUrl: req.file?.filename || null,
        menuName: menuName,
        quantity: +quantity,
        price: +price,
      },
    });

    const orderMessage = await createMessage(
      'ORDER',
      potId,
      req.user.id,
      order
    );

    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', orderMessage);

    // todo : communityId 별로 namesapce 나눠서 보내기
    io.of('/room').emit('updateLastMessage', { potId, message: orderMessage });

    console.log('order message sent');
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getOrdersByPotId(req, res, next) {
  //...
}

export async function getOrderById(req, res, next) {
  // ...
}

export async function updateOrder(req, res, next) {
  // ...
}

export async function deleteOrder(req, res, next) {
  // ...
}

// 메뉴 확인
export async function confirmOrder(req, res, next) {
  const { orderId } = req.params;
  const { messageId } = req.body;

  try {
    // 1. check if order exists
    const existingOrder = await prisma.deliveryOrder.findUnique({
      where: { id: +orderId },
    });
    if (!existingOrder) {
      throw new Error(`cant find order #${orderId}`);
    }
    if (existingOrder.orderConfirmed) {
      throw new Error(`already confirmed order #${orderId}`);
    }

    const potId = existingOrder.deliveryPotId;

    // 2. 방장 여부 확인
    const pot = await prisma.deliveryPot.findUnique({
      where: { id: potId },
    });
    if (!pot) {
      throw new Error(`cant find delivery pot #${potId}`);
    }
    if (pot.potMasterId !== req.user.id) {
      throw new Error('only pot master can confirm order');
    }

    // 3. 주문확인 트랜잭션(주문확인처리->주문메시지 수정->주문확인메시지 생성)
    let orderConfirmMessage;
    await prisma.$transaction(async (tx) => {
      // 3-1. update order
      const order = await prisma.deliveryOrder.update({
        where: { id: +orderId },
        data: { orderConfirmed: true },
        select: {
          id: true,
          orderConfirmed: true,
        },
      });

      // 3-2. update order message
      await updateOrderMessage(messageId, true);

      // 3-3. create order confirm message
      orderConfirmMessage = await createMessage(
        'ORDER_CONFIRM',
        potId,
        req.user.id,
        order
      );
    });

    // send message to chatroom
    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', orderConfirmMessage);

    // send message to chatlist
    io.of('/room').emit('updateLastMessage', {
      potId,
      message: orderConfirmMessage,
    });

    console.log('order confirm message sent');
    res.status(201).json(orderConfirmMessage);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
