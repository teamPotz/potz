import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import {
  getDeliveryPots,
  joinDeliveryPot,
  leaveDeliveryPot,
  getPotMessages,
  setPotStatus,
  cancelPotStatus,
  closeDeliveryPot,
} from '../controllers/deliveryPots.js';

const router = Router();
router.get('/', verifyAuth, getDeliveryPots);
router.patch('/:potId/join', verifyAuth, joinDeliveryPot);
router.patch('/:potId/leave', verifyAuth, leaveDeliveryPot);
router.get('/:potId/messages', verifyAuth, getPotMessages);
router.patch('/:potId/status', verifyAuth, setPotStatus);
router.patch('/:potId/close', verifyAuth, closeDeliveryPot);
// router.delete('/:potId/status', cancelPotStatus);

export default router;
