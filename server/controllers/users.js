import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserData(req, res) {
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

export default getUserData;
