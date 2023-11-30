import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import {
  getDeliveryPots,
  joinDeliveryPot,
  leaveDeliveryPot,
  getPotMessages,
  setPotStatus,
  getPotMasterId,
  cancelPotStatus,
} from '../controllers/deliveryPots.js';

const router = Router();
router.get('/', verifyAuth, getDeliveryPots);
router.patch('/:potId/join', verifyAuth, joinDeliveryPot);
router.patch('/:potId/leave', verifyAuth, leaveDeliveryPot);
router.get('/:potId/messages', verifyAuth, getPotMessages);
router.patch('/:potId/status', verifyAuth, setPotStatus);
// router.delete('/:potId/status', cancelPotStatus);
router.get('/:potId/pot-master', verifyAuth, getPotMasterId);

export default router;
