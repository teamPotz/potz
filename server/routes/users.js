import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import { getUserData, getUserDataById, getUserCommunitiesById, getUserOrderDataById } from '../controllers/users.js';

const router = Router();
router.get('/', getUserData);
router.get('/', verifyAuth, getUserData);
router.get('/user-info', verifyAuth, getUserDataById);
router.get('/user-communities-info', verifyAuth, getUserCommunitiesById);
router.get('/user-order', verifyAuth, getUserOrderDataById);

export default router;
