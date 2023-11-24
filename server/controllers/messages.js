import { PrismaClient } from '@prisma/client';
import { getSocketId } from '../services/users.js';

const prisma = new PrismaClient();

export async function sendMessage(req, res, next) {
  try {
    const { potId, content } = req.body;

    if (!potId || !content) {
      res.status(400);
      throw new Error('no potId or content');
    }

    const message = await prisma.message.create({
      data: {
        sender: {
          connect: { id: req.user.id },
        },
        content,
        deliveryPot: {
          connect: { id: potId },
        },
      },
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
      },
    });

    const newMessage = {
      type: 'text',
      ...message,
    };

    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', newMessage);

    console.log('text message sent');
    res.status(201).json(newMessage);
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

    const newMessages = messages.map((m) => ({ type: 'text', ...m }));

    res.status(200).json(newMessages);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
