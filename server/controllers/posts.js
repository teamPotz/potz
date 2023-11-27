import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 현재 주문 신청한 메뉴의 총 가격
function getTotalOrderPrice(orders) {
  const totalOrderPrice = orders.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );
  return totalOrderPrice;
}

// 현재 주문 신청한 사람 수
function getOrderedUserCount(orders) {
  if (orders.length <= 0) return 0;

  return Array.from(new Set(orders.map((order) => order.userId))).length;
}

// 적용되는 배달비 정보 구하기
function getApplicableDeliveryFeeInfo(deliveryFeeInfos, totalOrderPrice) {
  if (deliveryFeeInfos?.length <= 0) {
    return null;
  }

  // 1. 적용 가능한 금액 구간 filter
  const applicableDeliveryFees = deliveryFeeInfos.filter(
    (fee) =>
      totalOrderPrice >= fee.minAmount &&
      (fee.maxAmount === null || totalOrderPrice <= fee.maxAmount)
  );

  // 적용되는 구간이 없는 경우 모든 구간 중 가장 비싼 배달비로 적용
  if (applicableDeliveryFees.length <= 0) {
    const sortedDeliveryFeeInfos = deliveryFeeInfos.toSorted(
      (a, b) => b.fee - a.fee
    );
    return sortedDeliveryFeeInfos.at(0);
  }

  // 2. 적용되는 구간 중 배달요금 낮은 순서로 sort
  const sortedDeliveryFeeInfos = applicableDeliveryFees.toSorted(
    (a, b) => a.fee - b.fee
  );

  return sortedDeliveryFeeInfos.at(0);
}

// 현재 적용된 배달비 정보의 다음 단계 배달비 정보구하기
function getNextDeliveryFeeInfos(
  deliveryFeeInfos,
  currentDeliveryFeeInfo,
  totalOrderPrice
) {
  if (deliveryFeeInfos?.length <= 0) {
    return null;
  }

  // 1. 다음 금액 구간 중 현재 배달비보다 작은 조건 filter
  // 2. 최소금액조건 작은 순으로 sort
  const nextDeliveryFees = deliveryFeeInfos
    .filter(
      (info) =>
        info.minAmount > totalOrderPrice &&
        info.fee < currentDeliveryFeeInfo.fee
    )
    .toSorted((a, b) => a.fee - b.fee);

  return nextDeliveryFees.at(0) || null;
}

// 할인금액 구하기
function calculateDiscount(discountInfo, price) {
  if (discountInfo === undefined) return 0;
  // 금액 할인인 경우
  if (discountInfo.discount !== null) {
    return Math.min(discountInfo.discount, price);
    // 퍼센트 할인인 경우
  } else if (discountInfo.discountRate !== null) {
    return Math.min(
      discountInfo.discountRate * price,
      discountInfo.maxDiscountAmount || price
    );
  }
  return 0;
}

// 적용되는 할인 정보 구하기
function getAppliedDiscountInfo(deliveryDiscountInfos, totalOrderPrice) {
  if (deliveryDiscountInfos?.length <= 0) {
    return null;
  }

  // 1. 최소 금액 만족하는 할인 정보 filter
  // 2. 할인받을 수 있는 금액이 큰 순으로 sort
  const applicableDiscountInfos = deliveryDiscountInfos
    .filter((info) => totalOrderPrice > info.minAmount)
    .sort((a, b) => {
      const aDiscount = calculateDiscount(a, totalOrderPrice);
      const bDiscount = calculateDiscount(b, totalOrderPrice);
      return bDiscount - aDiscount;
    });

  return applicableDiscountInfos.at(0);
}

// 현재 적용된 할인 정보의 다음 단계 할인정보 구하기
function getNextDiscountInfos(
  deliveryDiscountInfos,
  currentDiscountInfo,
  totalOrderPrice
) {
  if (deliveryDiscountInfos?.length <= 0) {
    return null;
  }
  // 1. 최소금액 조건이 현재 주문액보다 크면서 할인금액이 현재보다 큰 할인조건 filter
  // 2. 최소금액 작은순으로 sort
  const nextDiscountInfos = deliveryDiscountInfos
    .filter(
      (info) =>
        info.minAmount > totalOrderPrice &&
        calculateDiscount(info, totalOrderPrice) >
          calculateDiscount(currentDiscountInfo, totalOrderPrice)
    )
    .sort((a, b) => a.minAmount - b.minAmount);
  return nextDiscountInfos.at(0);
}

export async function getPostsByCommunityId(req, res, next) {
  try {
    const { communityId } = req.query;
    console.log('홈 커뮤니티 데이터', communityId);

    if (!communityId) {
      res.status(400);
      throw new Error('missing communityId in request');
    }

    const posts = await prisma.post.findMany({
      where: {
        communityId: +communityId,
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        storeName: true,
        author: {
          select: { _count: { select: { deliveryPotHistoryAsMaster: true } } },
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

export async function getPostById(req, res) {
  const { id } = req.params;
  console.log('포스트 아이디', id);

  try {
    const post = await prisma.post.findUnique({
      where: {
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
          select: { profile: { select: { imageUrl: true } } },
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
    res.status(500).json({ message: 'get posts error' });
  }
}

export async function getPostByName(req, res) {
  const { key, communityId } = req.query;
  console.log(key, communityId);

  try {
    const post = await prisma.post.findMany({
      where: {
        communityId: parseInt(communityId, 10),
        storeName: {
          contains: key,
        },
      },
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
    });
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get posts error' });
  }
}

export async function getPostByCategoryId(req, res) {
  const { categoryId, communityId } = req.query;
  console.log('카테고리 아이디, 커뮤니티 아이디', categoryId, communityId);

  try {
    const posts = await prisma.post.findMany({
      where: {
        communityId: parseInt(communityId, 10),
        category: {
          id: +categoryId,
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
        category: {
          select: { name: true, id: true },
        },
        author: {
          select: { profile: { select: { imageUrl: true } } },
        },
        deliveryPot: {
          select: {
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
      };

      result.push(transformedPost);
    }

    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get posts error' });
  }
}

//create post
export async function createPost(req, res) {
  let imageUrl = req.file.path;
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
    console.log(deliveryFees);
    console.log(deliveryDiscounts);
    // 1. 게시글 등록
    const newPost = await prisma.post.create({
      data: {
        storeName,
        storeAddress,
        imageUrl: imageUrl,
        orderLink,
        categoryId: +categoryId,
        recruitment: +recruitment,
        meetingLocation,
        communityId: 1,
        authorId: req.user.id,
      },
    });

    // 2. 등록한 게시글의 배달비 정보 등록
    const postWithDeliveryFee = await prisma.deliveryFee.createMany({
      data: deliveryFees.map((item) => ({
        minAmount: parseInt(item[0]),
        maxAmount: item[2] ? parseInt(item[2]) : null,
        fee: parseInt(item[1]),
        postId: newPost.id,
      })),
    });

    // 3. 등록한 게시글의 할인정보 등록
    const postWithDeliveryDiscounts = await prisma.deliveryDiscount.createMany({
      data: deliveryDiscounts.map((item) => ({
        minAmount: parseInt(item[0]),
        discount: parseInt(item[1]),
        postId: newPost.id,
      })),
    });
    // 4. 등록한 게시글의 배달팟 생성
    const postWithDeliveryPot = await prisma.deliveryPot.create({
      data: {
        potMasterId: newPost.authorId,
        participants: {
          connect: [{ id: newPost.authorId }],
        },
        postId: newPost.id,
      },
    });

    res.status(201).json({ newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'create post error' });
  }
}

//update Post
export async function updateGetPost(req, res) {
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
    res.status(500).json({ message: 'get post error' });
  }
}

export async function updatePost(req, res) {
  const { id } = req.params;
  let imageUrl = req.file?.path;
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
        imageUrl: imageUrl,
        orderLink,
        categoryId: +categoryId,
        recruitment: +recruitment,
        meetingLocation,
        communityId: 1,
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
    res.status(500).json({ message: 'update post error' });
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const postDeleteWithUserId = await prisma.post.delete({
    where: {
      postId: +id,
      authorId: req.user.id,
    },
  });
}

/// 찜하기, 찜 취소하기
export async function toggleLike(req, res) {
  const postId = parseInt(req.params.id);
  console.log(postId, req.user.id);

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
    res.status(500).json({ message: 'update post error' });
  }
}
