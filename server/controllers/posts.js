import { PrismaClient } from '@prisma/client';
import {
  getTotalOrderPrice,
  getOrderedUserCount,
  getApplicableDeliveryFeeInfo,
  getNextDeliveryFeeInfos,
  getAppliedDiscountInfo,
  getNextDiscountInfos,
} from '../utils/deliveryCalculator.js';

const prisma = new PrismaClient();

export async function getPostById(req, res, next) {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        isDeleted: false,
        id: +id,
      },
      select: {
        id: true,
        storeName: true,
        storeAddress: true,
        imageUrl: true,
        orderLink: true,
        recruitment: true,
        meetingLocation: true,
        deliveryDiscounts: true,
        category: {
          select: { name: true, id: true },
        },
        author: {
          select: { id: true, profile: { select: { imageUrl: true } } },
        },
        deliveryPot: {
          select: {
            id: true,
            orders: true,
            _count: {
              select: { participants: true },
            },
          },
        },
        deliveryFees: true,
        _count: {
          select: { deliveryDiscounts: true },
        },
      },
    });

    const totalOrderPrice = getTotalOrderPrice(post.deliveryPot.orders);
    const appliedDeliveryFeeInfo = getApplicableDeliveryFeeInfo(
      post.deliveryFees,
      totalOrderPrice
    );

    const nextDeliveryFeeInfo = getNextDeliveryFeeInfos(
      post.deliveryFees,
      appliedDeliveryFeeInfo,
      totalOrderPrice
    );

    const appliedDiscountInfo = getAppliedDiscountInfo(
      post.deliveryDiscounts,
      totalOrderPrice
    );

    const nextDiscountInfos = getNextDiscountInfos(
      post.deliveryDiscounts,
      appliedDiscountInfo,
      totalOrderPrice
    );

    const orderedUserCount = getOrderedUserCount(post.deliveryPot.orders);

    const deliveryFeePerPerson =
      appliedDeliveryFeeInfo?.fee / (orderedUserCount || 1) || 0;

    const transformedPost = {
      id: post.id,
      storeName: post.storeName,
      storeAddress: post.storeAddress,
      imageUrl: post.imageUrl,
      orderLink: post.orderLink,
      categoryId: post.category.id,
      category: post.category.name,
      potMasterProfileImg: post.author.profile
        ? post.author.profile.imageUrl
        : null,
      authorId: post.author.id,
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
      potId: post.deliveryPot.id,
    };

    res.status(200).send(transformedPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getPostByLiked(req, res, next) {
  const { communityId } = req.query;

  try {
    const posts = await prisma.postLike.findMany({
      where: {
        userId: req.user.id,
        liked: true,
      },
      select: {
        post: {
          select: {
            isDeleted: true,
            communityId: true,
            id: true,
            storeName: true,
            storeAddress: true,
            imageUrl: true,
            orderLink: true,
            recruitment: true,
            meetingLocation: true,
            deliveryDiscounts: true,
            category: {
              select: { name: true, id: true },
            },
            author: {
              select: { profile: { select: { imageUrl: true } } },
            },
            deliveryPot: {
              select: {
                id: true,
                orders: { select: { id: true } },
                _count: {
                  select: { participants: true },
                },
              },
            },
            deliveryFees: true,
            _count: {
              select: { deliveryDiscounts: true },
            },
          },
        },
      },
    });

    const filteredPosts = posts.filter(
      (like) =>
        like.post.communityId === parseInt(communityId, 10) &&
        like.post.isDeleted === false
    );

    console.log(filteredPosts);

    const transformedposts = [];

    for (const post of filteredPosts) {
      const totalOrderPrice = getTotalOrderPrice(post.post.deliveryPot.orders);

      const appliedDeliveryFeeInfo = getApplicableDeliveryFeeInfo(
        post.post.deliveryFees,
        totalOrderPrice
      );

      const nextDeliveryFeeInfo = getNextDeliveryFeeInfos(
        post.post.deliveryFees,
        appliedDeliveryFeeInfo,
        totalOrderPrice
      );

      const appliedDiscountInfo = getAppliedDiscountInfo(
        post.post.deliveryDiscounts,
        totalOrderPrice
      );

      const nextDiscountInfos = getNextDiscountInfos(
        post.post.deliveryDiscounts,
        appliedDiscountInfo,
        totalOrderPrice
      );

      const orderedUserCount = getOrderedUserCount(
        post.post.deliveryPot.orders
      );

      const deliveryFeePerPerson =
        appliedDeliveryFeeInfo?.fee / (orderedUserCount || 1) || 0;

      const transformedpost = {
        id: post.post.id,
        storeName: post.post.storeName,
        storeAddress: post.post.storeAddress,
        imageUrl: post.post.imageUrl,
        orderLink: post.post.orderLink,
        categoryId: post.post.category.id,
        category: post.post.category.name,
        potMasterProfileImg: post.post.author.profile
          ? post.post.author.profile.imageUrl
          : null,
        participantsCount: post.post.deliveryPot._count.participants,
        recruitment: post.post.recruitment,
        meetingLocation: post.post.meetingLocation,
        orderedUserCount,
        totalOrderPrice,
        appliedDeliveryFeeInfo,
        nextDeliveryFeeInfo,
        appliedDiscountInfo,
        nextDiscountInfos,
        deliveryFeePerPerson,
        potId: post.post.deliveryPot.id,
      };
      transformedposts.push(transformedpost);
    }
    res.status(200).send(transformedposts);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getPostByName(req, res, next) {
  const { key, communityId } = req.query;
  // console.log(key, communityId);

  try {
    const posts = await prisma.post.findMany({
      where: {
        isDeleted: false,
        communityId: parseInt(communityId, 10),
        storeName: {
          contains: key,
        },
      },
      select: {
        id: true,
        storeName: true,
        storeAddress: true,
        imageUrl: true,
        orderLink: true,
        recruitment: true,
        meetingLocation: true,
        deliveryDiscounts: true,
        likedByUsers: {
          where: { userId: req.user.id, liked: true },
        },
        category: {
          select: { name: true, id: true },
        },
        author: {
          select: { profile: { select: { imageUrl: true } } },
        },

        deliveryPot: {
          select: {
            participants: true,
            orders: {
              select: {
                price: true,
                quantity: true,
                userId: true,
              },
            },
            _count: {
              select: { participants: true },
            },
          },
        },
        deliveryFees: true,
        _count: {
          select: { deliveryDiscounts: true },
        },
      },
    });

    console.log(posts);

    const result = [];
    for (const post of posts) {
      const totalOrderPrice = getTotalOrderPrice(post.deliveryPot.orders);

      const appliedDeliveryFeeInfo = getApplicableDeliveryFeeInfo(
        post.deliveryFees,
        totalOrderPrice
      );

      const nextDeliveryFeeInfo = getNextDeliveryFeeInfos(
        post.deliveryFees,
        appliedDeliveryFeeInfo,
        totalOrderPrice
      );

      const appliedDiscountInfo = getAppliedDiscountInfo(
        post.deliveryDiscounts,
        totalOrderPrice
      );

      const nextDiscountInfos = getNextDiscountInfos(
        post.deliveryDiscounts,
        appliedDiscountInfo,
        totalOrderPrice
      );

      const orderedUserCount = getOrderedUserCount(post.deliveryPot.orders);

      const deliveryFeePerPerson =
        appliedDeliveryFeeInfo?.fee / (orderedUserCount || 1) || 0;

      const transformedPost = {
        id: post.id,
        storeName: post.storeName,
        storeAddress: post.storeAddress,
        imageUrl: post.imageUrl,
        orderLink: post.orderLink,
        categoryId: post.category.id,
        category: post.category.name,
        potMasterProfileImg: post.author.profile
          ? post.author.profile.imageUrl
          : null,
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
        liked: post.likedByUsers.length > 0,
      };

      result.push(transformedPost);
      // console.log('appliedDeliveryFeeInfo', appliedDeliveryFeeInfo);
    }
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getPostByCategoryId(req, res, next) {
  const { categoryId, communityId } = req.query;
  console.log(categoryId, communityId);

  try {
    const posts = await prisma.post.findMany({
      where: {
        isDeleted: false,
        communityId: parseInt(communityId, 10),
        category: {
          id: parseInt(categoryId),
        },
      },
      select: {
        id: true,
        storeName: true,
        storeAddress: true,
        imageUrl: true,
        orderLink: true,
        recruitment: true,
        meetingLocation: true,
        deliveryDiscounts: true,
        likedByUsers: {
          where: { userId: req.user.id, liked: true },
        },
        category: {
          select: { name: true, id: true },
        },
        author: {
          select: { profile: { select: { imageUrl: true } } },
        },

        deliveryPot: {
          select: {
            participants: true,
            orders: {
              select: {
                price: true,
                quantity: true,
                userId: true,
              },
            },
            _count: {
              select: { participants: true },
            },
          },
        },
        deliveryFees: true,
        _count: {
          select: { deliveryDiscounts: true },
        },
      },
    });

    console.log(posts);

    const result = [];
    for (const post of posts) {
      const totalOrderPrice = getTotalOrderPrice(post.deliveryPot.orders);

      const appliedDeliveryFeeInfo = getApplicableDeliveryFeeInfo(
        post.deliveryFees,
        totalOrderPrice
      );

      const nextDeliveryFeeInfo = getNextDeliveryFeeInfos(
        post.deliveryFees,
        appliedDeliveryFeeInfo,
        totalOrderPrice
      );

      const appliedDiscountInfo = getAppliedDiscountInfo(
        post.deliveryDiscounts,
        totalOrderPrice
      );

      const nextDiscountInfos = getNextDiscountInfos(
        post.deliveryDiscounts,
        appliedDiscountInfo,
        totalOrderPrice
      );

      const orderedUserCount = getOrderedUserCount(post.deliveryPot.orders);
      // console.log('post.deliveryPot.orders', post.deliveryPot.orders);

      const deliveryFeePerPerson =
        appliedDeliveryFeeInfo?.fee / (orderedUserCount || 1) || 0;

      const transformedPost = {
        id: post.id,
        storeName: post.storeName,
        storeAddress: post.storeAddress,
        imageUrl: post.imageUrl,
        orderLink: post.orderLink,
        categoryId: post.category.id,
        category: post.category.name,
        potMasterProfileImg: post.author.profile
          ? post.author.profile.imageUrl
          : null,
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
        liked: post.likedByUsers.length > 0,
      };

      result.push(transformedPost);
      // console.log('appliedDeliveryFeeInfo', appliedDeliveryFeeInfo);
    }
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

//create post
export async function createPost(req, res, next) {
  const imageUrl = req.file?.filename || null;
  const deliveryFees = JSON.parse(req.body.deliveryFees);
  const deliveryDiscounts = JSON.parse(req.body.deliveryDiscounts);
  const {
    storeName,
    storeAddress,
    orderLink,
    categoryId,
    recruitment,
    meetingLocation,
    communityId,
  } = req.body;

  try {
    // todo : use transaction
    // 1. 게시글 등록
    const post = await prisma.post.create({
      data: {
        storeName,
        storeAddress,
        imageUrl: imageUrl,
        orderLink,
        categoryId: +categoryId,
        recruitment: +recruitment,
        meetingLocation,
        communityId: +communityId,
        authorId: req.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            _count: {
              select: { deliveryPotHistoryAsMaster: true },
            },
          },
        },
        category: {
          select: { id: true, name: true },
        },
        deliveryPot: {
          select: {
            _count: { select: { participants: true } },
          },
        },
        deliveryDiscounts: true,
      },
    });

    // 2. 등록한 게시글의 배달비 정보 등록
    await prisma.deliveryFee.createMany({
      data: deliveryFees.map((item) => ({
        minAmount: parseInt(item[0]),
        maxAmount: item[2] ? parseInt(item[2]) : null,
        fee: parseInt(item[1]),
        postId: post.id,
      })),
    });

    // 3. 등록한 게시글의 할인정보 등록
    const discountCount = await prisma.deliveryDiscount.createMany({
      data: deliveryDiscounts.map((item) => ({
        minAmount: parseInt(item[0]),
        discount: parseInt(item[1]),
        postId: post.id,
      })),
    });

    // 4. 등록한 게시글의 배달팟 생성
    await prisma.deliveryPot.create({
      data: {
        potMasterId: post.authorId,
        participants: {
          connect: [{ id: post.authorId }],
        },
        postId: post.id,
      },
    });

    // 5. notification
    // 5-1. find members in community
    const communityMembers = await prisma.communitiesOnUsers.findMany({
      where: { communityId: +communityId },
      select: {
        userId: true,
        community: {
          select: { name: true },
        },
      },
    });

    if (communityMembers.length > 0) {
      // 5-2. create notification
      const noti = await prisma.notification.createMany({
        data: communityMembers.map((member) => ({
          type: 'NEW_POST',
          userId: member.userId,
          content: {
            postId: post.id,
            storeName: post.storeName,
            categoryId: +categoryId,
            communityName: member.community.name,
          },
        })),
      });
    }

    // 현재 배달팟에서 주문 신청한 메뉴의 총 가격
    const totalOrderPrice = 0;

    // 현재 배달팟에서 주문 신청한 사람 수
    const orderedUserCount = 0;

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

    const result = {
      id: post.id,
      storeName: post.storeName,
      imageUrl: post.imageUrl,
      category: post.category.name,
      liked: false,
      orderLink: post.orderLink,
      participantsCount: 1,
      recruitment: post.recruitment,
      meetingLocation: post.meetingLocation,
      orderedUserCount: 0,
      totalOrderPrice,
      appliedDeliveryFeeInfo,
      nextDeliveryFeeInfo,
      appliedDiscountInfo,
      nextDiscountInfos,
      deliveryFeePerPerson,
      hasDiscount: discountCount > 0,
      potMasterHistoryCount: post.author._count.deliveryPotHistoryAsMaster,
    };

    // send notification
    const io = req.app.get('io');
    io.of('/community').to(communityId.toString()).emit('newPost', result);

    res.status(201).json({ result });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

//update Post
export async function updateGetPost(req, res, next) {
  const { id } = req.params;
  try {
    const updateGetPost = await prisma.post.findUnique({
      where: {
        id: +id,
        authorId: req.user.id,
      },
      select: {
        id: true,
        storeName: true,
        storeAddress: true,
        imageUrl: true,
        orderLink: true,
        categoryId: true,
        recruitment: true,
        meetingLocation: true,
        deliveryFees: true,
        deliveryDiscounts: true,
      },
    });
    res.status(201).json(updateGetPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function updatePost(req, res, next) {
  const { id } = req.params;
  let imageUrl = req.file?.filename;
  let deliveryFees = JSON.parse(req.body.deliveryFees);
  let deliveryDiscounts = JSON.parse(req.body.deliveryDiscounts);

  const {
    storeName,
    storeAddress,
    orderLink,
    categoryId,
    recruitment,
    meetingLocation,
  } = req.body;

  try {
    console.log(req.body);
    const getPost = await prisma.post.findUnique({
      where: {
        id: +id,
        authorId: req.user.id,
      },
    });

    let updatedPostData = '';
    if (getPost) {
      updatedPostData = {
        storeName,
        storeAddress,
        imageUrl,
        orderLink,
        categoryId: +categoryId,
        recruitment: +recruitment,
        meetingLocation,
      };
    }
    const updatePost = await prisma.post.update({
      where: {
        id: +id,
      },
      data: updatedPostData,
    });

    //원래 있던 베달비, 할인비 삭제
    const updatePostWithDeleteDeliveryFee = await prisma.deliveryFee.deleteMany(
      {
        where: {
          postId: +id,
        },
      }
    );
    const updatePostWithDeleteDeliveryDiscount =
      await prisma.deliveryDiscount.deleteMany({
        where: {
          postId: +id,
        },
      });
    //업데이트한 게시글의 배달비 할인정보 등록
    const updatePostWithDeliveryFee = await prisma.deliveryFee.createMany({
      data: deliveryFees.map((item) => ({
        minAmount: parseInt(item[0]),
        maxAmount: item[2] ? parseInt(item[2]) : null,
        fee: parseInt(item[1]),
        postId: +id,
      })),
    });
    const postWithDeliveryDiscounts = await prisma.deliveryDiscount.createMany({
      data: deliveryDiscounts.map((item) => ({
        minAmount: parseInt(item[0]),
        discount: parseInt(item[1]),
        postId: +id,
      })),
    });

    res.status(201).json(updatePost);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function deletePost(req, res, next) {
  const { id } = req.params;
  console.log(id);

  try {
    const deletedPost = await prisma.post.update({
      where: {
        id: parseInt(id),
        authorId: req.user.id,
      },
      data: {
        isDeleted: true,
      },
    });
    res.status(201).send(deletedPost);
    console.log('데이터 삭제 완료');
  } catch (error) {
    console.error(error);
    next(error);
  }
}

/// 찜하기, 찜 취소하기
export async function toggleLike(req, res, next) {
  const postId = parseInt(req.params.id);

  //좋아요 여부 확인을 위한 사용자 정보
  const existingLike = await prisma.postLike.findUnique({
    where: {
      userId_postId: {
        userId: req.user.id,
        postId: postId,
      },
    },
  });

  try {
    const result = await prisma.postLike.upsert({
      where: {
        userId_postId: {
          userId: req.user.id,
          postId: postId,
        },
      },
      //사용자가 있되, 기존의 liked가 true면 false로 / false면 true로 update
      update: {
        liked: existingLike ? !existingLike.liked : true,
      },
      //사용자가 없는 경우 생성
      create: {
        postId: postId,
        userId: req.user.id,
        liked: true,
      },
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
