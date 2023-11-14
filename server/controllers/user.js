import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserData(req, res) {
  try {
    const userData = await prisma.User.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        profile: true,
        posts: true,
        communities: true,
        likedPosts: true,
        likedPosts: true,
        createdDeliveryPots: true,
        participatedDeliveryPots: true,
        orders: true,
        deliveryPotHistoryAsMaster: true,
        deliveryPotHistoryAsMember: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get userData error' });
  }
}

export default getUserData;
