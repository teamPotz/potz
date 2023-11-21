import { Router } from 'express';
import fileUpload from '../middlewares/multer.js';
import { verifyAuth } from '../middlewares/auth.js';

import {
  getPostByName,
  getPosts,
  getPostById,
  updateGetPost,
  updatePost,
  deletePost,
  createPost,
  toggleLike,
} from '../controllers/posts.js';

const router = Router();
router.get('/', getPosts);
router.get('/search', getPostByName);
router.post('/', verifyAuth, fileUpload.single('image'), createPost);
router.route('/:id/update').get(updateGetPost).patch(fileUpload.single('image'), updatePost);
router.route('/:id').get(getPostById).delete(deletePost);
router.patch('/:id/like', toggleLike);

export default router;
