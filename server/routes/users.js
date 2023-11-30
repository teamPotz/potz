import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import { getUserData, getUserDataById, deleteUserCommunity, getUserOrderDataById } from '../controllers/users.js';

const router = Router();
router.get('/', getUserData);
router.get('/', verifyAuth, getUserData);
router.get('/user-info', verifyAuth, getUserDataById);
router.patch('/user-community/delete', verifyAuth, deleteUserCommunity);
router.get('/user-order', verifyAuth, getUserOrderDataById);

export default router;
