import { Router } from 'express';
import getUserData from '../controllers/users.js';

const router = Router();

router.get('/', getUserData);

export default router;
