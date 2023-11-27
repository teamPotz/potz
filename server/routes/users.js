import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import { getUserData, getUserDataById } from '../controllers/users.js';

const router = Router();
router.get('/', getUserData);
router.get('/', verifyAuth, getUserData);
router.get('/user-info', verifyAuth, getUserDataById);

export default router;
