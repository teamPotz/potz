import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPosts(req, res) {
  try {
    const posts = await prisma.postTemp.findMany();
    res.status(200).send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get posts error' });
  }
}

export async function createPost(req, res) {
  const { title, content } = req.body;

  try {
    const post = await prisma.postTemp.create({
      data: {
        title,
        content,
      },
    });
    res.status(201).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'create post error' });
  }
}

export async function getPostById(req, res) {
  // ...
}

export async function updatePost(req, res) {
  // ...
}

export async function deletePost(req, res) {
  // ...
}
