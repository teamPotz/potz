import { Router } from 'express';
import {
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  createPost,
} from '../controllers/post.js';

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);
router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);

export default router;
