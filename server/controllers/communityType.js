import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCommunityType(req, res, next) {
  try {
    const communityTypes = await prisma.communityType.findMany({
      select: {
        id: true,
        name: true,
        displayOrder: true,
      },
    });
    res.status(200).send(communityTypes);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export default getCommunityType;
