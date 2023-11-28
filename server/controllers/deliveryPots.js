import {
  checkPotExists,
  checkUserJoined,
  joinPot,
  leavePot,
} from '../services/deliveryPots.js';
import { PrismaClient } from '@prisma/client';
import { createMessage } from '../services/messages.js';
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
  const { potId } = req.params;
  try {
    if (!potId) {
      res.status(400);
      throw new Error('missing potId in request');
    }

    // 1. pot 존재 여부 확인
    const potExists = await checkPotExists(potId);
    if (!potExists) {
      throw new Error(`deliveryPot id #${potId} not found`);
    }

    // 2. 이미 join된 pot인지 확인
    const userAlreadyJoined = await checkUserJoined(potId, req.user.id);
    if (userAlreadyJoined) {
      return res.status(200).json(userAlreadyJoined);
    }

    // 3. join pot
    const result = await joinPot(potId, req.user.id);

    // 4. create system message
    const systemMessage = await createMessage('SYSTEM', potId, req.user.id, {
      message: `${req.user.name}님이 입장했습니다.`,
    });

    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', systemMessage);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function leaveDeliveryPot(req, res, next) {
  const { potId } = req.params;
  try {
    if (!potId) {
      res.status(400);
      throw new Error('missing potId in request');
    }

    const potExists = await checkPotExists(potId);
    if (!potExists) {
      throw new Error(`deliveryPot id #${potId} not found`);
    }

    const result = await leavePot(potId, req.user.id);

    // create system message
    const systemMessage = await createMessage('SYSTEM', potId, req.user.id, {
      message: `${req.user.name}님이 퇴장했습니다.`,
    });

    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', systemMessage);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getPotMasterId(req, res, next) {
  const { potId } = req.params;
  try {
    const potMasterId = await prisma.deliveryPot.findUnique({
      where: { id: +potId },
      select: {
        potMasterId: true,
      },
    });
    res.status(200).json(potMasterId);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
