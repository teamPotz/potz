import { Router } from 'express';
import { sendMessage } from '../controllers/messages.js';
import { verifyAuth } from '../middlewares/auth.js';

const router = Router();
router.post('/', verifyAuth, sendMessage);

export default router;
