import { Router } from 'express';
import {
  getCommunities,
  createCommunity,
  getCommunityById,
  updateCommunity,
  deleteCommunity,
} from '../controllers/communities.js';

const router = Router();

router.get('/', getCommunities);
router.post('/', createCommunity);
router
  .route('/:id')
  .get(getCommunityById)
  .patch(updateCommunity)
  .delete(deleteCommunity);

export default router;
