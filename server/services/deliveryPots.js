import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function checkPotExists(potId) {
  const potExists = await prisma.deliveryPot.findUnique({
    where: {
      id: +potId,
    },
  });
  return potExists ? true : false;
}

export async function enterPot(potId, userId) {
  // 1. 이미 join된 pot인지 확인
  const pot = await prisma.deliveryPot.findUnique({
    where: {
      id: +potId,
      participants: {
        some: { id: +userId },
      },
    },
    include: {
      potMaster: {
        select: { id: true, name: true },
      },
      post: {
        select: {
          id: true,
          storeName: true,
          imageUrl: true,
        },
      },
      status: {
        select: { id: true, status: true },
      },
      orders: {
        where: { orderConfirmed: true },
        select: {
          price: true,
          quantity: true,
        },
      },
      _count: {
        select: { participants: true },
      },
    },
  });

  if (pot) {
    return { pot, alreadyJoined: true };
  }

  // 2. join 안된 pot인 경우 등록
  const joinedPot = await prisma.deliveryPot.update({
    where: { id: +potId },
    data: {
      participants: {
        connect: { id: +userId },
      },
    },
    include: {
      potMaster: {
        select: { id: true, name: true },
      },
      post: {
        select: {
          id: true,
          storeName: true,
          imageUrl: true,
        },
      },
      status: {
        select: { id: true, status: true },
      },
      orders: {
        where: { orderConfirmed: true },
        select: {
          price: true,
        },
      },
      _count: {
        select: { participants: true },
      },
    },
  });

  return { pot: joinedPot, alreadyJoined: false };
}

export async function leavePot(potId, userId) {
  const leavedPot = await prisma.deliveryPot.update({
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

  return leavedPot;
}
