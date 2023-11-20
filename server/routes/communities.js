import { Router } from 'express';
import fileUpload from '../middlewares/multer.js';
import { verifyAuth } from '../middlewares/auth.js';
import {
  getCommunities,
  createCommunity,
  getCommunityById,
  updateCommunity,
  deleteCommunity,
  saveCommunityImg,
} from '../controllers/communities.js';

const router = Router();

//Router

router.get('/', verifyAuth, getCommunities);
router.post('/', verifyAuth, createCommunity);
router.post('/photo', fileUpload.single('image'), saveCommunityImg);
// router.post('/join', joinCommunity);
router
  .route('/:id')
  .get(verifyAuth, getCommunityById)
  .patch(verifyAuth, updateCommunity)
  .delete(verifyAuth, deleteCommunity);

export default router;
