import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import {
  getDeliveryPots,
  getPotMasterId,
  getPotMessages,
  joinDeliveryPot,
  leaveDeliveryPot,
} from '../controllers/deliveryPots.js';

const router = Router();
router.get('/', verifyAuth, getDeliveryPots);
router.patch('/:potId/join', verifyAuth, joinDeliveryPot);
router.patch('/:potId/leave', verifyAuth, leaveDeliveryPot);
router.get('/:potId/messages', verifyAuth, getPotMessages);
router.get('/:potId/pot-master', verifyAuth, getPotMasterId);

export default router;
