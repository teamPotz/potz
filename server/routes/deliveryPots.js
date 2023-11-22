import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import {
  getDeliveryPots,
  getPotMasterId,
  joinDeliveryPot,
  leaveDeliveryPot,
} from '../controllers/deliveryPots.js';

const router = Router();
router.get('/', verifyAuth, getDeliveryPots);
router.get('/:potId/pot-master', verifyAuth, getPotMasterId);
router.patch('/join', verifyAuth, joinDeliveryPot);
router.patch('/leave', verifyAuth, leaveDeliveryPot);

export default router;
