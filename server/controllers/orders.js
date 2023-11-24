import { PrismaClient } from '@prisma/client';

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
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const io = req.app.get('io');
    io.of('/chat')
      .to(potId.toString())
      .emit('message', {
        type: 'order',
        ...order,
      });

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

    // 3. update order
    const order = await prisma.deliveryOrder.update({
      where: { id: +orderId },
      data: { orderConfirmed: true },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const orderConfirmMessage = {
      type: 'order_confirm',
      ...order,
    };

    // 4. send order confirm message
    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', orderConfirmMessage);

    console.log('order confirmed');
    res.status(201).json(orderConfirmMessage);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// 입금 확인
export async function confirmDeposit(req, res, next) {
  // ...
}
