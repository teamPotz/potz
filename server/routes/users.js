import { Router } from 'express';
import getUserData from '../controllers/users.js';
import { verifyAuth } from '../middlewares/auth.js';

const router = Router();
router.get('/', verifyAuth, getUserData);

export default router;
