import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function checkPotExists(potId) {
  const potExists = await prisma.deliveryPot.findUnique({
    where: {
      id: potId,
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
    where: { id: potId },
    data: {
      participants: {
        connect: { id: userId },
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
  });

  return leavedPot;
}

export async function getParticipantsByPotId(potId) {
  const { participants } = await prisma.deliveryPot.findUnique({
    where: { id: +potId },
    select: {
      participants: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return participants;
}

// export async function getPotMasterId(req, res, next) {
//   const { potId } = req.params;
//   const potMasterId = await prisma.deliveryPot.findUnique({
//     where: { id: +potId },
//     select: {
//       potMasterId: true,
//     },
//   });
//   return potMasterId;
// }

// export async function getJoinedDeliveryPots(userId) {
//   const deliveryPots = await prisma.deliveryPot.findMany({
//     where: { participants: { some: { id: userId } } },
//     include: {
//       post: {
//         select: {
//           id: true,
//           storeName: true,
//           imageUrl: true,
//         },
//       },
//       messages: {
//         orderBy: {
//           createdAt: 'desc',
//         },
//         take: 1,
//       },
//     },
//   });
//   return deliveryPots;
// }
