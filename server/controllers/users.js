import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserData(req, res, next) {
  try {
    const userData = await prisma.User.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profile: true,
      },
    });
    res.status(200).send(userData);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getUserDataById(req, res, next) {
  try {
    const userData = await prisma.User.findMany({
      where: {
        id: req.user.id,
      },
      select: {
        communities: {
          select: {
            communityId: true,
            joinedAt: true,
          },
        },
      },
    });
    res.status(200).send(userData);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function deleteUserCommunity(req, res, next) {
  try {
    const deleteCommunity = await prisma.CommunitiesOnUsers.delete({
      where: {
        userId_communityId: {
          communityId: req.body.communityId,
          userId: req.user.id,
        },
      },
    });
    res.status(201).send(deleteCommunity);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getUserOrderDataById(req, res, next) {
  try {
    const userData = await prisma.User.findMany({
      where: {
        id: req.user.id,
      },
      select: {
        deliveryPotHistoryAsMember: {
          select: {
            deliveryPotId: true,
            deliveryPot: {
              select: {
                post: {
                  select: {
                    categoryId: true,
                  },
                },
                orders: {
                  select: {
                    menuName: true,
                    userId: true,
                    price: true,
                    quantity: true,
                    imageUrl: true,
                    orderConfirmed: true,
                    updatedAt: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.status(200).send(userData);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getUserDeliveryPotHistory(req, res, next) {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        _count: {
          select: {
            participatedDeliveryPots: true,
            deliveryPotHistoryAsMaster: true,
          },
        },
      },
    });

    // console.log(userData._count);
    res.status(200).send(userData._count);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function updateUserAccountById(req, res, next) {
  const accountOwner = req.body.accountOwner;
  const account = req.body.account;
  const bankName = req.body.bankName;

  try {
    const userAccount = await prisma.userProfile.upsert({
      where: {
        userId: req.user.id,
      },
      update: {
        accountHolderName: accountOwner,
        accountNumber: account,
        bankName: bankName,
      },
      create: {
        accountHolderName: accountOwner,
        accountNumber: account,
        bankName: bankName,
        userId: req.user.id,
      },
    });

    res.status(200).send(userAccount);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function updateUserById(req, res, next) {
  const imgUrl = req.file.path.replace('uploads', '');

  try {
    const userData = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name: req.body.userName,
      },
    });

    const userProfile = await prisma.userProfile.upsert({
      where: {
        userId: req.user.id,
      },
      update: {
        imageUrl: imgUrl,
      },
      create: {
        userId: req.user.id,
        imageUrl: imgUrl,
      },
    });

    res.status(200).send({ userData, userProfile });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getNotifications(req, res, next) {
  try {
    const noti = await prisma.notification.findMany({
      where: {
        userId: req.user.id,
        confirmed: false,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(noti);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function readAllNotifications(req, res, next) {
  try {
    const noti = await prisma.notification.updateMany({
      where: {
        userId: req.user.id,
        confirmed: false,
      },
      data: { confirmed: true },
    });

    return res.status(200).json(noti);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
