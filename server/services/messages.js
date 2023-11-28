import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createMessage(type, potId, userId, content) {
  const message = await prisma.message.create({
    data: {
      type,
      content,
      sender: {
        connect: { id: +userId },
      },
      deliveryPot: {
        connect: { id: +potId },
      },
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          profile: {
            select: { imageUrl: true },
          },
        },
      },
    },
  });

  return message;
}

export async function updateOrderMessage(messageId, orderConfirmed) {
  const existingMessage = await prisma.message.findUnique({
    where: { id: +messageId },
  });

  if (!existingMessage) {
    throw new Error('message not found');
  }
  const newContent = {
    ...existingMessage.content,
    orderConfirmed,
  };

  const message = await prisma.message.update({
    where: { id: +messageId },
    data: {
      content: newContent,
    },
  });

  return message;
}

export async function updateDepositMessage(messageId, depositConfirmed) {
  const existingMessage = await prisma.message.findUnique({
    where: { id: +messageId },
  });

  if (!existingMessage) {
    throw new Error('message not found');
  }
  const newContent = {
    ...existingMessage.content,
    depositConfirmed,
  };

  const message = await prisma.message.update({
    where: { id: +messageId },
    data: {
      content: newContent,
    },
  });

  return message;
}
