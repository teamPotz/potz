import { Router } from 'express';
import {
  getPostByName,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  createPost,
  toggleLike,
} from '../controllers/posts.js';

const router = Router();
router.get('/', getPosts);
router.post('/', createPost);
router.route('/search').get(getPostByName);
router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);
router.patch('/:id/like', toggleLike);

export default router;
