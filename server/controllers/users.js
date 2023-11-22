import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserData(req, res) {
  try {
    const userData = await prisma.User.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profile: true,
      },
    });
    res.status(200).send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get userData error' });
  }
}

export async function getUserDataById(req, res) {
  try {
    const userData = await prisma.User.findMany({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: true,
        communities: {
          select: {
            userId: true,
            communityId: true,
            joinedAt: true,
          },
        },
      },
    });
    res.status(200).send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get userData error' });
  }
}
