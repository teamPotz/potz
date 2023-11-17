import { Router } from 'express';
import getCommunityType from '../controllers/communityType.js';

const router = Router();

router.get('/', getCommunityType);

export default router;
