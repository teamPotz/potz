import { PrismaClient } from '@prisma/client';
import { createMessage, updateOrderMessage } from '../services/messages.js';

const prisma = new PrismaClient();

export async function createOrder(req, res, next) {
  const { potId, menuName, quantity, price } = req.body;

  try {
    let order, orderMessage;
    await prisma.$transaction(async (tx) => {
      order = await tx.deliveryOrder.create({
        data: {
          deliveryPotId: +potId,
          userId: req.user.id,
          imageUrl: req.file?.filename || null,
          menuName: menuName,
          quantity: +quantity,
          price: +price,
        },
      });

      orderMessage = await createMessage(
        tx,
        'ORDER',
        potId,
        req.user.id,
        order
      );
    });

    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', orderMessage);

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
    let order, orderConfirmMessage;
    await prisma.$transaction(async (tx) => {
      // 3-1. update order
      order = await tx.deliveryOrder.update({
        where: { id: +orderId },
        data: { orderConfirmed: true },
        select: {
          id: true,
          orderConfirmed: true,
          price: true,
          quantity: true,
          user: { select: { name: true } },
        },
      });

      // 3-2. update order message
      await updateOrderMessage(tx, messageId, true);

      // 3-3. create order confirm message
      orderConfirmMessage = await createMessage(
        tx,
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

    // update order
    io.of('/chat')
      .to(potId.toString())
      .emit('updateOrder', { price: order.price, quantity: order.quantity });

    console.log('order confirm message sent');
    res.status(201).json(orderConfirmMessage);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// 방장용 메뉴선택(주문, 주문확인, 입금, 입금확인 까지 처리)
export async function createOrderAndDeposit(req, res, next) {
  const { potId, menuName, quantity, price } = req.body;
  // const imageUrl = req.file?.filename || null;
  const imageUrl = req.file?.location || null;

  try {
    let order, orderMessage, depositMessage;
    await prisma.$transaction(async (tx) => {
      // 1-1. create order and confirm
      order = await tx.deliveryOrder.create({
        data: {
          deliveryPotId: +potId,
          userId: req.user.id,
          imageUrl,
          menuName: menuName,
          quantity: +quantity,
          price: +price,
          orderConfirmed: true,
        },
      });

      // 1-2. create order message
      orderMessage = await createMessage(
        tx,
        'ORDER',
        potId,
        req.user.id,
        order
      );

      // 2. create deposit and confirm
      const deposit = await tx.deposit.create({
        data: {
          deliveryPotId: +potId,
          userId: req.user.id,
          amount: +price * +quantity,
          depositor: `${req.user.name}(방장)`,
          imageUrl,
          depositConfirmed: true,
        },
      });

      // 2-2. create deposit message
      depositMessage = await createMessage(
        tx,
        'DEPOSIT',
        potId,
        req.user.id,
        deposit
      );
    });

    const io = req.app.get('io');
    // send message to chatroom
    io.of('/chat').to(potId.toString()).emit('message', orderMessage);
    // send message to chatlist
    io.of('/room').emit('updateLastMessage', { potId, message: orderMessage });

    // send message to chatroom
    io.of('/chat').to(potId.toString()).emit('message', depositMessage);
    // send message to chatlist
    io.of('/room').emit('updateLastMessage', {
      potId,
      message: depositMessage,
    });

    // update order
    io.of('/chat')
      .to(potId.toString())
      .emit('updateOrder', { price: order.price, quantity: order.quantity });

    console.log(`potmaster's order&deposit completed`);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
