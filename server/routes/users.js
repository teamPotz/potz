import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import { getUserData, getUserDataById, getUserOrderById } from '../controllers/users.js';

const router = Router();
router.get('/', getUserData);
router.get('/', verifyAuth, getUserData);
router.get('/user-info', verifyAuth, getUserDataById);
router.get('/user-order', verifyAuth, getUserOrderById);

export default router;
