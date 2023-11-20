import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function sendMessage(req, res, next) {
  try {
    const { potId, content } = req.body;
    if (!potId || !content) {
      res.status(400);
      throw new Error('no potId or content');
    }

    const newMessage = await prisma.message.create({
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

    req.app
      .get('io')
      .of('/chat')
      .to(potId.toString())
      .emit('message', newMessage);

    console.log('sent');
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

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
