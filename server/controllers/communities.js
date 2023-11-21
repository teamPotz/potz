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

export async function getCommunitiesByLocation(req, res) {
  const { latitude, longitude } = req.query;
  console.log(latitude, longitude);

  try {
    const result = await prisma.$queryRaw`
    SELECT community.*, 
        (SELECT ST_DISTANCE_SPHERE(point(longitude, latitude), point(${longitude},${latitude}))) as distance,
        COUNT(post.id) as post_count
    FROM community
    LEFT JOIN post ON community.id = post.communityId

    WHERE ST_DISTANCE_SPHERE(point(longitude, latitude), point(${longitude},${latitude})) <= 500
    GROUP BY community.id
    ORDER BY distance;
    `;
    const stringifiedData = JSON.stringify(result, (key, value) => {
      if (typeof value === 'bigint') {
        return value.toString();
      }
      return value;
    });

    res.status(200).send(stringifiedData);
    console.log(stringifiedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get communities error' });
  }
}

export async function getCommunityById(req, res) {
  console.log(req.user);
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
            likedByUsers: {
              where: { userId: req.user.id, liked: true },
            },
            communityId: true,
            deliveryPot: {
              select: {
                participants: true,
                orders: {
                  select: {
                    price: true,
                    quantity: true,
                  },
                },
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
  let editPath = '/' + req.file.path.replace(/\\/g, '/');
  communityPhoto = editPath.replace('/public', '');
}

export async function createCommunity(req, res) {
  console.log(req.user);
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
            id: req.user.id,
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

// export async function joinCommunity(req, res) {
//   // ...

//   await prisma.community.update({
//     data:{
//       members:{
//         connect:?
//       }
//     }
//   })
// }
