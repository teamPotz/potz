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

export async function checkUserJoined(potId, userId) {
  const userAlreadyJoined = await prisma.deliveryPot.findUnique({
    where: {
      id: +potId,
      participants: {
        some: { id: +userId },
      },
    },
  });

  return userAlreadyJoined ? true : false;
}

export async function joinPot(potId, userId) {
  const result = await prisma.deliveryPot.update({
    where: { id: +potId },
    data: {
      participants: {
        connect: { id: +userId },
      },
    },
    include: {
      post: {
        select: {
          id: true,
          storeName: true,
          imageUrl: true,
        },
      },
      messages: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
      _count: {
        select: {
          participants: true,
        },
      },
    },
  });

  return result;
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
