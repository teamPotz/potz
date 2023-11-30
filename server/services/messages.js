import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getMessagesByPotId(potId) {
  const messages = await prisma.message.findMany({
    where: { deliveryPotId: +potId },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: {
            select: { imageUrl: true },
          },
        },
      },
      readBy: {
        select: { id: true },
      },
      deliveryPot: true,
    },
  });

  const results = messages.reduce(
    (acc, cur) => [
      ...acc,
      { ...cur, readBy: cur.readBy.reduce((acc, cur) => [...acc, cur.id], []) },
    ],
    []
  );

  return results;
}

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
      readBy: {
        connect: { id: +userId },
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
      readBy: {
        select: { id: true },
      },
    },
  });

  const result = {
    ...message,
    readBy: message.readBy.reduce((acc, cur) => [...acc, cur.id], []),
  };

  return result;
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

export async function readMessage(messageId, userId) {
  const readMessage = await prisma.message.update({
    where: { id: +messageId },
    data: {
      readBy: { connect: { id: +userId } },
    },
    include: {
      readBy: {
        select: { id: true },
      },
      _count: {
        select: {
          readBy: true,
        },
      },
    },
  });

  return readMessage;
}

export async function readAllMessages(potId, userId) {
  // 1. 해당 방의 안읽은 메시지 구하기
  const unreadMessages = await prisma.message.findMany({
    where: {
      deliveryPotId: +potId,
      NOT: {
        readBy: {
          some: { id: +userId },
        },
      },
    },
  });

  // 2. {id: n} 형태로 가공
  const unreadMessageIds = unreadMessages.reduce(
    (acc, cur) => [...acc, { id: cur.id }],
    []
  );

  // 3. 읽은 메시지에 추가
  const user = await prisma.user.update({
    where: { id: +userId },
    data: {
      readMessages: {
        connect: unreadMessageIds,
      },
    },
    select: {
      readMessages: {
        select: { id: true },
      },
    },
  });

  return user;
}
