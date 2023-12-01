import { Router } from 'express';
import fileUpload from '../middlewares/multer.js';
import { verifyAuth } from '../middlewares/auth.js';
import {
  joinCommunity,
  getCommunitiesByLocation,
  getCommunities,
  createCommunity,
  getCommunityById,
  updateCommunity,
  deleteCommunity,
  saveCommunityImg,
  getPostsByCommunityId,
} from '../controllers/communities.js';

const router = Router();

//Router

router.get('/', verifyAuth, getCommunities);
router.post('/', verifyAuth, createCommunity);
router.get('/search', verifyAuth, getCommunitiesByLocation);
router.post('/photo', fileUpload.single('image'), saveCommunityImg);
router.get('/:id/posts', verifyAuth, getPostsByCommunityId);
router.patch('/:id/join', joinCommunity);
router
  .route('/:id')
  .get(verifyAuth, getCommunityById)
  .patch(verifyAuth, updateCommunity)
  .delete(verifyAuth, deleteCommunity);

export default router;
