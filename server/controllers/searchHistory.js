import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getSearchHistory(req, res, next) {
  try {
    const communityTypes = await prisma.searchResult.findMany({
      where: {
        userId: req.user.id,
      },
      distinct: ['keyword'],
      select: {
        keyword: true,
        id: true,
      },
    });
    res.status(200).send(communityTypes);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function createSearchHistory(req, res, next) {
  const { keyword } = req.body;

  try {
    const newSearhData = await prisma.searchResult.create({
      data: {
        userId: req.user.id,
        keyword,
      },
    });

    res.status(201).send(newSearhData);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function deleteSearchHistory(req, res, next) {
  try {
    const deletedSearchData = await prisma.searchResult.deleteMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({ message: '데이터 삭제 완료', deletedSearchData });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
