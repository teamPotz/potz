import { Router } from 'express';
import { getUserData, getUserDataById } from '../controllers/users.js';

const router = Router();

router.get('/', getUserData);
router.get('/user-info', getUserDataById);

export default router;
