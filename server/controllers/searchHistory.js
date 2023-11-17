import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSearchHistory(req, res) {
  try {
    const communityTypes = await prisma.searchResult.findMany({
      where: {
        userId: 1,
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
  console.log('키워드', keyword);

  try {
    //todo: userId 1 대신 로그인 유저 데이터 id 넣기
    const newSearhData = await prisma.searchResult.create({
      data: {
        userId: 1,
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
  const { keyword } = req.params;
  console.log(keyword);
  const userId = parseInt(keyword, 10);

  try {
    const deletedSearchData = await prisma.searchResult.deleteMany({
      where: {
        userId,
      },
    });
    res.status(200).json({ message: '데이터 삭제 완료', deletedSearchData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete search data' });
  }
}
