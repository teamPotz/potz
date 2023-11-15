import { PrismaClient } from '@prisma/client';

let communityPhoto = '';
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
              },
            },
            author: {
              select: {
                createdDeliveryPots: true,
              },
            },
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

export async function saveCommunityImg(req, res) {
  console.log(req.file.path);
  communityPhoto = req.file.path;
}

export async function createCommunity(req, res) {
  const { communityTypes, members, longitude, latitude, name } = req.body;

  try {
    //todo: id 1 대신 로그인 유저 데이터 id 넣기
    const newCommunityData = await prisma.community.create({
      data: {
        communityTypes: {
          connect: { id: communityTypes.id },
        },
        members: {
          connect: {
            id: 1,
          },
        },
        longitude,
        latitude,
        imageUrl: communityPhoto,
        name,
      },
    });

    res.status(201).send(newCommunityData);
    console.log('데이터 저장 완료');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get communities error' });
  }
}

export async function updateCommunity(req, res) {
  // ...
}

export async function deleteCommunity(req, res) {
  // ...
}
