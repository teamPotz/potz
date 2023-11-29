import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSearchHistory(req, res) {
  // console.log('get', req.user);
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
    res.status(500).json({ message: 'get communities error' });
  }
}

export async function createSearchHistory(req, res) {
  const { keyword } = req.body;
  // console.log('키워드', keyword);
  // console.log('create', req.user);

  try {
    //todo: userId 1 대신 로그인 유저 데이터 id 넣기
    const newSearhData = await prisma.searchResult.create({
      data: {
        userId: req.user.id,
        keyword,
      },
    });

    res.status(201).send(newSearhData);
    console.log('데이터 저장 완료');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get communities error' });
  }
}

export async function deleteSearchHistory(req, res) {
  // console.log('delete', req.user);
  try {
    const deletedSearchData = await prisma.searchResult.deleteMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({ message: '데이터 삭제 완료', deletedSearchData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete search data' });
  }
}
