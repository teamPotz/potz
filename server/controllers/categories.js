import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getCategoryById(req, res) {
  const { id } = req.params;

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
            //나중에 로그인 된 유저 id 넣기
            likedByUsers: {
              where: { userId: 1, liked: true },
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
      where: {
        id: +id,
      },
    });
    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get categories error' });
  }
}
