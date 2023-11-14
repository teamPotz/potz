import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const users = [
  {
    email: 'test@test.com',
    password: '1234',
    name: '테스터1',
    imageUrl: '/sample-images/user-1.png',
    address: '서울 금천구 가산디지털1로 70',
    latitude: 37.4721697668434,
    longitude: 126.88543185036376,
    accountNumber: '1234-01234-0012-0001',
  },
  {
    email: 'test2@test.com',
    password: '1234',
    name: '테스터2',
    imageUrl: '/sample-images/user-2.png',
    address: '서울 금천구 가산디지털1로 168',
    latitude: 37.479116375617735,
    longitude: 126.88295657960482,
    accountNumber: '1234-01234-0012-0002',
  },
];

const categories = [
  {
    name: '버거·샌드위치',
    displayOrder: 1,
    imageUrl: '/sample-images/category/category-burger.png',
  },
  {
    name: '카페·디저트',
    displayOrder: 2,
    imageUrl: '/sample-images/category/category-cafe.png',
  },
  {
    name: '한식',
    displayOrder: 4,
    imageUrl: '/sample-images/category/category-koreanFood.png',
  },
  {
    name: '초밥·회',
    displayOrder: 3,
    imageUrl: '/sample-images/category/category-sushi.png',
  },
  {
    name: '중식·아시안',
    displayOrder: 6,
    imageUrl: '/sample-images/category/category-chineseFood.png',
  },
  {
    name: '피자',
    displayOrder: 5,
    imageUrl: '/sample-images/category/category-pizza.png',
  },
  {
    name: '치킨',
    displayOrder: 7,
    imageUrl: '/sample-images/category/category-pizza.png',
  },
  {
    name: '샐러드',
    displayOrder: 8,
    imageUrl: '/sample-images/category/category-salad.png',
  },
];

const communityTypes = [
  { name: '주택가', displayOrder: 1 },
  { name: '학원', displayOrder: 3 },
  { name: '교내 시설', displayOrder: 2 },
  { name: '아파트', displayOrder: 5 },
  { name: '기숙사', displayOrder: 4 },
  { name: '지하철 역', displayOrder: 6 },
  { name: '상가', displayOrder: 7 },
  { name: '직장', displayOrder: 8 },
];

const communities = [
  {
    name: '인천 영어마을 기숙사',
    longitude: 37.58864938741291,
    latitude: 126.70157687573356,
    imageUrl: '/sample-images/community-1.png',
    members: [1, 2],
    communityTypes: [2, 3],
  },
  {
    name: '더샵하버뷰 1동 모임',
    longitude: 37.397900784651625,
    latitude: 126.64703596898717,
    imageUrl: '/sample-images/community-2.png',
    members: [1],
    communityTypes: [4],
  },
  {
    name: '송도 대학교 기숙사',
    longitude: 37.397900784651625,
    latitude: 126.64703596898717,
    members: [],
    imageUrl: '/sample-images/community-3.png',
    communityTypes: [3, 5],
  },
  {
    name: '강남역 1번 출구',
    longitude: 37.397900784651625,
    latitude: 126.64703596898717,
    members: [],
    imageUrl: '/sample-images/community-4.png',
    communityTypes: [6],
  },
  {
    name: '타운 상가 장사 모임',
    longitude: 37.397900784651625,
    latitude: 126.64703596898717,
    imageUrl: '/sample-images/community-5.png',
    communityTypes: [7, 8],
  },
  {
    name: '단독주택끼리 뭉쳐요',
    longitude: 37.397900784651625,
    latitude: 126.64703596898717,
    imageUrl: '/sample-images/community-6.png',
    communityTypes: [1],
  },
];

const posts = [
  {
    storeName: '디저트36 송도점',
    storeAddress: '인천 연수구 인천타워대로 241',
    imageUrl: '/sample-images/pot-1',
    orderLink: 'https://baemin.me/jDQWwYtpw',
    categoryId: 2,
    recruitment: 10,
    meetingLocation: '아파트 정문',
    deliveryFees: [
      {
        minAmount: 30000,
        maxAmount: null,
        fee: 3500,
      },
      {
        minAmount: 18000,
        maxAmount: 30000,
        fee: 4000,
      },
      {
        minAmount: 13000,
        maxAmount: 18000,
        fee: 4500,
      },
    ],
    deliveryDiscounts: [
      {
        minAmount: 0,
        discount: 1500,
        discountRate: null,
        maxDiscountAmount: null,
      },
      {
        minAmount: 15000,
        discount: 1000,
        discountRate: null,
        maxDiscountAmount: null,
      },
      {
        minAmount: 100000,
        discount: 5000,
        discountRate: null,
        maxDiscountAmount: null,
      },
      {
        minAmount: 0,
        discount: null,
        discountRate: 0.1,
        maxDiscountAmount: 2000,
      },
      {
        minAmount: 19000,
        discount: null,
        discountRate: 0.2,
        maxDiscountAmount: 2000,
      },
      {
        minAmount: 49000,
        discount: null,
        discountRate: 0.25,
        maxDiscountAmount: 2000,
      },
    ],
    communityId: 1,
    authorId: 1,
  },
  {
    storeName: '커플 케이크 하버뷰점',
    storeAddress: '인천 연수구 센트럴로 160',
    imageUrl: '/sample-images/pot-2',
    orderLink: 'https://baemin.me/jDQWwYtpw',
    categoryId: 8,
    recruitment: 10,
    meetingLocation: '아파트 정문',
    deliveryFees: [
      {
        minAmount: 30000,
        maxAmount: null,
        fee: 3500,
      },
      {
        minAmount: 18000,
        maxAmount: 30000,
        fee: 4000,
      },
      {
        minAmount: 13000,
        maxAmount: 18000,
        fee: 4500,
      },
    ],
    deliveryDiscounts: [],
    communityId: 1,
    authorId: 1,
  },
  {
    storeName: '연어 박사',
    storeAddress: '인천 연수구 센트럴로 160',
    imageUrl: '/sample-images/pot-4',
    orderLink: 'https://baemin.me/jDQWwYtpw',
    categoryId: 4,
    recruitment: 15,
    meetingLocation: '아파트 정문',
    deliveryFees: [],
    deliveryDiscounts: [],
    communityId: 1,
    authorId: 2,
  },
];

const postLikes = [
  { postId: 1, userId: 1, liked: true },
  { postId: 1, userId: 2, liked: true },
  { postId: 2, userId: 2, liked: false },
  { postId: 3, userId: 1, liked: true },
];

const deliveryOrders = [
  {
    deliveryPotId: 1,
    userId: 1,
    menuItem: '회오리 오므라이스',
    quantity: 1,
    price: 8500,
  },
  {
    deliveryPotId: 1,
    userId: 2,
    menuItem: '아이스 아메리카노',
    quantity: 2,
    price: 4500,
  },
];

const deliveryPotHistories = [
  {
    potMasterId: 1,
    participants: [1, 2],
    deliveryPotId: 1,
  },
  {
    potMasterId: 1,
    participants: [1, 2],
    deliveryPotId: 2,
  },
];

async function main() {
  // create users
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        password: user.password,
        name: user.name,
        profile: {
          create: {
            imageUrl: user.imageUrl,
            address: user.address,
            latitude: user.latitude,
            longitude: user.longitude,
            accountNumber: user.accountNumber,
          },
        },
      },
    });
  }

  // create categories
  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        name: category.name,
      },
      update: {},
      create: {
        name: category.name,
        displayOrder: category.displayOrder,
        imageUrl: category.imageUrl,
      },
    });
  }

  // create community types
  for (const item of communityTypes) {
    await prisma.communityType.upsert({
      where: { name: item.name },
      update: {},
      create: { name: item.name, displayOrder: item.displayOrder },
    });
  }

  // create communities
  const count = await prisma.community.count();
  if (count === 0) {
    for (const community of communities) {
      await prisma.community.create({
        data: {
          name: community.name,
          latitude: community.latitude,
          longitude: community.longitude,
          imageUrl: community.imageUrl,
          communityTypes: {
            connect: community.communityTypes.map((item) => ({ id: item })),
          },
          members: {
            connect: community.members?.map((item) => ({ id: item })),
          },
        },
      });
    }
  }

  // create post
  const postCount = await prisma.post.count();
  if (postCount == 0) {
    for (const post of posts) {
      // 1. 게시글 등록
      const createdPost = await prisma.post.create({
        data: {
          storeName: post.storeName,
          storeAddress: post.storeAddress,
          imageUrl: post.imageUrl,
          orderLink: post.orderLink,
          categoryId: post.categoryId,
          recruitment: post.recruitment,
          meetingLocation: post.meetingLocation,
          communityId: post.communityId,
          authorId: post.authorId,
        },
      });
      console.log(createdPost);

      // 2. 등록한 게시글의 배달비 정보 등록
      const postWithDeliveryFee = await prisma.deliveryFee.createMany({
        data: post.deliveryFees.map((item) => ({
          ...item,
          postId: createdPost.id,
        })),
      });
      console.log(postWithDeliveryFee);

      // 3. 등록한 게시글의 할인정보 등록
      const postWithDeliveryDiscount = await prisma.deliveryDiscount.createMany(
        {
          data: post.deliveryDiscounts.map((item) => ({
            ...item,
            postId: createdPost.id,
          })),
        }
      );
      console.log(postWithDeliveryDiscount);

      // 4. 등록한 게시글의 배달팟 생성
      const postWithDeliveryPot = await prisma.deliveryPot.create({
        data: {
          potMasterId: createdPost.authorId,
          participants: {
            connect: [{ id: createdPost.authorId }],
          },
          postId: createdPost.id,
        },
      });
      console.log(postWithDeliveryPot);
    }
  }

  // like posts
  for (const postLike of postLikes) {
    await prisma.postLike.upsert({
      where: {
        userId_postId: {
          userId: postLike.userId,
          postId: postLike.postId,
        },
      },
      update: {},
      create: {
        userId: postLike.userId,
        postId: postLike.postId,
        liked: postLike.liked,
      },
    });
  }

  // create deliveryOrders
  for (const order of deliveryOrders) {
    await prisma.deliveryOrder.create({
      data: {
        deliveryPotId: order.deliveryPotId,
        userId: order.userId,
        menuName: order.menuItem,
        quantity: order.quantity,
        price: order.price,
      },
    });
  }

  // create deliveryPot histories
  for (const history of deliveryPotHistories) {
    await prisma.deliveryPotHistory.upsert({
      where: { deliveryPotId: history.deliveryPotId },
      update: {},
      create: {
        potMasterId: history.potMasterId,
        participants: {
          connect: history.participants.map((item) => ({ id: item })),
        },
        deliveryPotId: history.deliveryPotId,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
