import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import { getDeliveryPots } from '../controllers/deliveryPots.js';

const router = Router();
router.get('/', verifyAuth, getDeliveryPots);

export default router;
