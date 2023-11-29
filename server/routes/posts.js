import { Router } from 'express';
import fileUpload from '../middlewares/multer.js';
import { verifyAuth } from '../middlewares/auth.js';

import {
  getPostByCategoryId,
  updatePost,
  deletePost,
  createPost,
  toggleLike,
  getPostsByCommunityId,
  getPostById,
  getPostByName,
  updateGetPost,
  getPostByLiked,
} from '../controllers/posts.js';

const router = Router();
router.get('/', verifyAuth, getPostsByCommunityId);
router.get('/search', verifyAuth, getPostByName);
router.get('/category', verifyAuth, getPostByCategoryId);
router.get('/liked', verifyAuth, getPostByLiked);
router.post('/', verifyAuth, fileUpload.single('image'), createPost);
router
  .route('/:id/update')
  .get(verifyAuth, updateGetPost)
  .patch(fileUpload.single('image'), verifyAuth, updatePost);
router.route('/:id').get(verifyAuth, getPostById).patch(verifyAuth, deletePost);
router.patch('/:id/like', verifyAuth, toggleLike);

export default router;
