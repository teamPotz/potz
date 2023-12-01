import { Router } from 'express';
import fileUpload from '../middlewares/multer.js';
import { verifyAuth } from '../middlewares/auth.js';

import {
  getPostByCategoryId,
  updatePost,
  deletePost,
  createPost,
  toggleLike,
  getPostById,
  getPostByName,
  updateGetPost,
  getPostByLiked,
} from '../controllers/posts.js';

const router = Router();
router.post('/', verifyAuth, fileUpload.single('image'), createPost);
router.get('/search', verifyAuth, getPostByName);
router.get('/category', verifyAuth, getPostByCategoryId);
router.get('/liked', verifyAuth, getPostByLiked);
router
  .route('/:id/update')
  .get(verifyAuth, updateGetPost)
  .patch(verifyAuth, fileUpload.single('image'), updatePost);
router.route('/:id').get(verifyAuth, getPostById).patch(deletePost);
router.patch('/:id/like', verifyAuth, toggleLike);

export default router;
