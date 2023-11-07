import { Router } from 'express';
import {
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  createPost,
  toggleLike,
  getSamplePosts,
  createSamplePost,
} from '../controllers/posts.js';

const router = Router();

// TODO: remove samples
router.get('/sample', getSamplePosts);
router.post('/sample', createSamplePost);

router.get('/', getPosts);
router.post('/', createPost);
router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);
router.patch('/:id/like', toggleLike);

export default router;
