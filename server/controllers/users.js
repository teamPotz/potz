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
        communities: {
          select: {
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

export async function getUserOrderDataById(req, res) {
  try {
    const userData = await prisma.User.findMany({
      where: {
        id: req.user.id,
      },
      select: {
        deliveryPotHistoryAsMember: {
          select: {
            deliveryPotId: true,
            deliveryPot: {
              select: {
                post: {
                  select: {
                    categoryId: true,
                  }
                },
                orders: {
                  select: {
                    price: true,
                    quantity: true,
                  }
                }
              }
            }
          }
        }
      },
    });
    res.status(200).send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get userData error' });
  }
}
