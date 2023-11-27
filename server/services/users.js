import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function setSocketId(userId, socketId) {
  const result = await prisma.user.update({
    where: { id: +userId },
    data: { socketId },
  });
  return result;
}

export async function getSocketId(userId) {
  const { socketId } = await prisma.user.findUnique({
    where: { id: +userId },
    select: {
      socketId: true,
    },
  });
  console.log('yoy', socketId);
  return socketId;
}
