import { Router } from 'express';
import fileUpload from '../middlewares/multer.js';

import {
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  createPost,
  savePostImg,
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
router.post('/photo', fileUpload.single('image'), savePostImg);
router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);
router.patch('/:id/like', toggleLike);

export default router;
