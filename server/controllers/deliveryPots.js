import { PrismaClient } from '@prisma/client';
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
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
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
  try {
    const { potId } = req.body;
    if (!potId) {
      res.status(400);
      throw new Error('missing potId in request');
    }

    const potExists = await prisma.deliveryPot.findUnique({
      where: {
        id: potId,
      },
    });

    if (!potExists) {
      throw new Error(`deliveryPot id #${potId} not found`);
    }

    const userAlreadyJoined = await prisma.deliveryPot.findUnique({
      where: {
        id: potId,
        participants: {
          some: { id: req.user.id },
        },
      },
    });
    if (userAlreadyJoined) {
      return res.status(200).json({ message: 'already joined' });
    }

    const joinedPot = await prisma.deliveryPot.update({
      where: { id: potId },
      data: {
        participants: {
          connect: { id: req.user.id },
        },
      },
    });

    req.app
      .get('io')
      .of('/chat')
      .to(potId.toString())
      .emit('message', 'enterd');

    res.status(200).json(joinedPot);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function leaveDeliveryPot(req, res, next) {
  try {
    const { potId } = req.body;
    if (!potId) {
      res.status(400);
      throw new Error('missing potId in request');
    }

    const potExists = await prisma.deliveryPot.findUnique({
      where: {
        id: +potId,
      },
    });

    if (!potExists) {
      throw new Error(`deliveryPot id #${potId} not found`);
    }

    const leavedPot = await prisma.deliveryPot.update({
      where: { id: +potId },
      data: {
        participants: {
          disconnect: { id: req.user.id },
        },
      },
    });

    res.status(200).json(leavedPot);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getPotMasterId(req, res, next) {
  const { potId } = req.params;
  console.log(potId);
  try {
    const potMasterId = await prisma.deliveryPot.findUnique({
      where: { id: +potId },
      select: {
        potMasterId: true,
      },
    });
    console.log(potMasterId);
    res.status(200).json(potMasterId);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
