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
        communityTypes: {
          select: {
            communityType: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            posts: true,
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
        (acc, cur) => [...acc, cur.communityType.name],
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
    SELECT c.*,
        GROUP_CONCAT(ct.name) AS communityTypes,
        (select count(*) from post where communityId=c.id) as postCount,
        (select count(*) from communitiesOnUsers where communityId=c.id) as memberCount,
        (select ST_DISTANCE_SPHERE(point(longitude, latitude), point(126.92042451465518, 37.4999810960111))) as distance
    FROM community c
      INNER JOIN CommunityTypesOnCommunities ctc ON c.id = ctc.communityId
      INNER JOIN CommunityType ct ON ctc.communityTypeId = ct.id
    WHERE ST_DISTANCE_SPHERE(point(longitude, latitude), point(126.92042451465518, 37.4999810960111)) <= 5000
    GROUP BY c.id
    order by distance;
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
  const { id } = req.params;
  try {
    const community = await prisma.community.findUnique({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        communityTypes: {
          select: {
            communityType: {
              select: {
                id: true,
                name: true,
              },
            },
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

    const transformedCommunity = {
      ...community,
      communityTypes: community.communityTypes.reduce(
        (acc, cur) => [...acc, cur.communityType],
        []
      ),
    };
    res.status(200).send(transformedCommunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get communities error' });
  }
}

export async function saveCommunityImg(req, res) {
  console.log(req.file.path);
  let editPath = '/' + req.file.path.replace(/\\/g, '/');
  communityPhoto = editPath.replace('/uploads', '');
}

export async function createCommunity(req, res) {
  const { communityTypes, longitude, latitude, name } = req.body;

  try {
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
