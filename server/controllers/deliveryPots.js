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
