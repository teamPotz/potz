import { Router } from 'express';
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  confirmDeposit,
} from '../controllers/orders.js';

const router = Router();

// todo : login 여부, 본인 여부 확인 미들웨어 추가
router.get('/', getOrders);
router.post('/', createOrder);
router.route('/:id').get(getOrderById).patch(updateOrder).delete(deleteOrder);

// todo : 방장여부 확인 미들웨어 추가
router.patch('/:id/confirm', confirmDeposit);

export default router;
