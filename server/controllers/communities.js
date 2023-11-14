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
  let { communityTypes, members, longitude, latitude, posts, name } = req.body;

  // console.log(
  //   communityPhoto,
  //   communityTypes,
  //   members,
  //   longitude,
  //   latitude,
  //   posts,
  //   name
  // );

  try {
    //받아온 커뮤니티 타입 DB에서 찾기
    const findExistingCommunityType = await prisma.communityType.findFirst({
      where: {
        name: communityTypes.name,
      },
    });

    //받아온 유저 데이터 DB에서 찾기
    const findExistingUserDatas = await prisma.user.findFirst({
      where: {
        name: members[0].name,
      },
    });

    const newCommunityData = await prisma.community.create({
      data: {
        communityTypes: {
          connect: {
            name: findExistingCommunityType.name,
            displayOrder: findExistingCommunityType.displayOrder,
          },
        },
        members: {
          connect: {
            name: findExistingUserDatas.name,
            email: findExistingUserDatas.email,
            password: findExistingUserDatas.password,
            profile: findExistingUserDatas.profile,
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
