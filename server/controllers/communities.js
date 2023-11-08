import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCommunities(req, res) {
  try {
    const communities = await prisma.community.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        _count: {
          select: {
            members: true,
            posts: true,
          },
        },
        communityTypes: {
          select: {
            name: true,
          },
        },
      },
    });

    const transformedCommunities = communities.map((community) => ({
      id: community.id,
      name: community.name,
      imageUrl: community.imageUrl,
      membersCount: community._count.members,
      postsCount: community._count.posts,
      communityTypes: community.communityTypes.reduce(
        (acc, cur) => [...acc, cur.name],
        []
      ),
    }));

    res.status(200).send(transformedCommunities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get communities error' });
  }
}

export async function getCommunityById(req, res) {
  const { id } = req.params;

  try {
    const communities = await prisma.community.findUnique({
      select: {
        id: true,
        name: true,
        communityTypes: {
          select: {
            name: true,
          },
        },
        _count: {
          select: { members: true },
        },
      },
      where: {
        id: +id,
      },
    });
    res.status(200).send(communities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get communities error' });
  }
}

export async function createCommunity(req, res) {
  // ...
}

export async function updateCommunity(req, res) {
  // ...
}

export async function deleteCommunity(req, res) {
  // ...
}