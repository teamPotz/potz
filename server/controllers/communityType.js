import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCommunityType(req, res) {
  try {
    const communityTypes = await prisma.communityType.findMany({
      select: {
        id: true,
        name: true,
        displayOrder: true,
        communities: true,
      },
    });
    // const transformedCommunityType = communityTypes.map((communityType) => ({
    //   id: communityType.id,
    //   name: communityType.name,
    // }));
    res.status(200).send(communityTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get communities error' });
  }
}

export default getCommunityType;
