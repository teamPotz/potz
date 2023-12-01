import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserData(req, res) {
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
    res.status(500).json({ message: 'get userData error' });
  }
}

export async function getUserDataById(req, res) {
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
    res.status(500).json({ message: 'get userData error' });
  }
}

export async function deleteUserCommunity(req, res) {
  console.log('탈퇴할 커뮤니티id:', req.body);
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
    res.status(500).json({ message: 'delete user-community error' });
  }
}

export async function getUserOrderDataById(req, res) {
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
                    price: true,
                    quantity: true,
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
    res.status(500).json({ message: 'get userData error' });
  }
}

export async function updateUserAccountById(req, res) {
  console.log(req.body);

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
    res.status(500).json({ message: 'get userData error' });
  }
}

export async function updateUserById(req, res) {
  console.log(req.user.id);
  console.log(req.file);
  console.log(req.body.userName);
  console.log(req.body);

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
    res.status(500).json({ message: 'get userData error' });
  }
}
