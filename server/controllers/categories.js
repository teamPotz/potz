import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getCategory(req, res, next) {
  try {
    const categories = await prisma.Category.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        displayOrder: true,
      },
    });

    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getCategoryById(req, res, next) {
  const { id } = req.params;
  // console.log(req.user);
  try {
    const categories = await prisma.category.findUnique({
      select: {
        posts: {
          select: {
            storeName: true,
            imageUrl: true,
            id: true,
            storeAddress: true,
            orderLink: true,
            category: true,
            recruitment: true,
            meetingLocation: true,
            deliveryFees: true,
            deliveryDiscounts: true,
            likedByUsers: {
              where: { userId: req.user.id, liked: true },
            },
            communityId: true,
            deliveryPot: {
              select: {
                participants: true,
                orders: true,
              },
            },
            author: {
              select: {
                profile: {
                  select: {
                    imageUrl: true,
                  },
                },
                createdDeliveryPots: true,
              },
            },
          },
        },
      },
      where: { id: Number(id) },
    });

    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
