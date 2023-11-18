import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/messages.js';
import { verifyAuth } from '../middlewares/auth.js';

const router = Router();
router.post('/', verifyAuth, sendMessage);
router.get('/:id', verifyAuth, getMessages);

export default router;
