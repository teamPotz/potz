import { PrismaClient } from '@prisma/client';
import { getSocketId } from '../services/users.js';
import { createMessage } from '../services/messages.js';

const prisma = new PrismaClient();

export async function sendMessage(req, res, next) {
  try {
    const { type, potId, content } = req.body;

    if (!potId || !content) {
      res.status(400);
      throw new Error('no potId or content');
    }

    const message = await createMessage(type, potId, req.user.id, content);

    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', message);

    console.log('message sent');
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getMessages(req, res, next) {
  try {
    const { id } = req.params;

    const messages = await prisma.message.findMany({
      where: { deliveryPotId: +id },
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
        deliveryPot: true,
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
