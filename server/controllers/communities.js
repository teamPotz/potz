import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import {
  getTotalOrderPrice,
  getOrderedUserCount,
  getApplicableDeliveryFeeInfo,
  getNextDeliveryFeeInfos,
  getAppliedDiscountInfo,
  getNextDiscountInfos,
} from '../utils/deliveryCalculator.js';

export async function getPostsByCommunityId(req, res, next) {
  try {
    const { id: communityId } = req.params;

    if (!communityId) {
      res.status(400);
      throw new Error('missing communityId in request');
    }

    const posts = await prisma.post.findMany({
      where: {
        isDeleted: false,
        communityId: +communityId,
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        storeName: true,
        author: {
          select: {
            id: true,
            _count: { select: { deliveryPotHistoryAsMaster: true } },
          },
        },
        imageUrl: true,
        orderLink: true,
        recruitment: true,
        meetingLocation: true,
        likedByUsers: {
          where: { userId: req.user.id, liked: true },
        },
        category: {
          select: { name: true },
        },
        deliveryPot: {
          select: {
            _count: { select: { participants: true } },
            orders: {
              select: {
                price: true,
                quantity: true,
                userId: true,
              },
            },
          },
        },
        deliveryFees: true,
        _count: {
          select: { deliveryDiscounts: true },
        },
        deliveryDiscounts: true,
      },
    });

    const transformedPosts = posts.map((post) => {
      // 현재 배달팟에서 주문 신청한 메뉴의 총 가격
      const totalOrderPrice = getTotalOrderPrice(post.deliveryPot.orders);

      // 현재 배달팟에서 주문 신청한 사람 수
      const orderedUserCount = getOrderedUserCount(post.deliveryPot.orders);

      // 적용되는 배달비 정보
      const appliedDeliveryFeeInfo = getApplicableDeliveryFeeInfo(
        post.deliveryFees,
        totalOrderPrice
      );

      // 다음 적용될 수 있는 배달비 정보
      const nextDeliveryFeeInfo = getNextDeliveryFeeInfos(
        post.deliveryFees,
        appliedDeliveryFeeInfo,
        totalOrderPrice
      );

      // 적용된 할인 정보
      const appliedDiscountInfo = getAppliedDiscountInfo(
        post.deliveryDiscounts,
        totalOrderPrice
      );

      // 다음 적용될 수 있는 할인 정보
      const nextDiscountInfos = getNextDiscountInfos(
        post.deliveryDiscounts,
        appliedDiscountInfo,
        totalOrderPrice
      );

      // 1인당 배달비
      const deliveryFeePerPerson =
        appliedDeliveryFeeInfo?.fee / (orderedUserCount || 1) || 0;

      return {
        id: post.id,
        storeName: post.storeName,
        imageUrl: post.imageUrl,
        category: post.category.name,
        liked: post.likedByUsers.length > 0,
        orderLink: post.orderLink,
        participantsCount: post.deliveryPot._count.participants,
        recruitment: post.recruitment,
        meetingLocation: post.meetingLocation,
        orderedUserCount,
        totalOrderPrice,
        appliedDeliveryFeeInfo,
        nextDeliveryFeeInfo,
        appliedDiscountInfo,
        nextDiscountInfos,
        deliveryFeePerPerson,
        hasDiscount: post.deliveryDiscounts?.length > 0,
        potMasterHistoryCount: post.author._count.deliveryPotHistoryAsMaster,
      };
    });

    res.status(200).send(transformedPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getCommunities(req, res, next) {
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
    next(error);
  }
}

export async function getCommunityTypes(req, res, next) {
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

export async function getCommunitiesByLocation(req, res, next) {
  const { latitude, longitude } = req.query;
  let lat = latitude;
  let long = longitude;
  console.log(lat, long);

  try {
    const result = await prisma.$queryRaw`
    SELECT c.*,
        GROUP_CONCAT(ct.name) AS communityTypes,
        (select count(*) from Post where communityId=c.id) as postCount,
        (select count(*) from CommunitiesOnUsers where communityId=c.id) as memberCount,
        (select ST_DISTANCE_SPHERE(point(longitude, latitude), point(${long}, ${lat}))) as distance
    FROM Community c
      INNER JOIN CommunityTypesOnCommunities ctc ON c.id = ctc.communityId
      INNER JOIN CommunityType ct ON ctc.communityTypeId = ct.id
    WHERE ST_DISTANCE_SPHERE(point(longitude, latitude), point(${long}, ${lat})) <= 1000
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
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getCommunityById(req, res, next) {
  const { id } = req.params;
  const communityId = parseInt(id, 10);
  // console.log('커뮤니티 아이디', communityId);

  try {
    const community = await prisma.community.findUnique({
      where: {
        id: communityId,
      },
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
        posts: true,
        _count: {
          select: { members: true },
        },
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
    next(error);
  }
}

let communityPhoto = '';
export async function saveCommunityImg(req, res, next) {
  // console.log(req.file.path);
  // let editPath = '/' + req.file.path.replace(/\\/g, '/');
  // communityPhoto = editPath.replace('/uploads', '');
  communityPhoto = req.file?.location || null;
}

export async function createCommunity(req, res, next) {
  const { communityTypes, longitude, latitude, name } = req.body;
  // console.log('유저 아이디', req.user.id);

  try {
    const newCommunityData = await prisma.community.create({
      data: {
        communityTypes: {
          connect: { id: communityTypes.id },
        },
        members: {
          create: {
            user: {
              connect: {
                id: req.user.id,
              },
            },
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
    next(error);
  }
}

export async function joinCommunity(req, res, next) {
  const { id } = req.params;

  console.log('userid, communityId', req.user.id, parseInt(id));
  //연결용 DB에서 유저 검색/추가
  try {
    const existingConnection = await prisma.communitiesOnUsers.findFirst({
      where: {
        userId: req.user.id,
        communityId: parseInt(id),
      },
    });

    if (!existingConnection) {
      const updateUserData = await prisma.communitiesOnUsers.create({
        data: {
          communityId: +id,
          userId: req.user.id,
        },
      });

      console.log('가입 완료.');
      res.status(201).send(updateUserData);
    } else {
      console.log('이미 가입된 상태.');
      res.status(201).send({ existingConnection: existingConnection });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function updateCommunity(req, res, next) {
  // ...
}
