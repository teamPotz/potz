import { Router } from 'express';
import fileUpload from '../middlewares/multer.js';
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

router.get('/', getCommunities);
router.post('/', createCommunity);
router.post('/photo', fileUpload.single('image'), saveCommunityImg);
router
  .route('/:id')
  .get(getCommunityById)
  .patch(updateCommunity)
  .delete(deleteCommunity);

export default router;
