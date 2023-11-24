import { Router } from 'express';
import {
  getOrdersByPotId,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  confirmOrder,
  confirmDeposit,
} from '../controllers/orders.js';
import { verifyAuth } from '../middlewares/auth.js';
import fileUpload from '../middlewares/multer.js';

const router = Router();

// todo : login 여부, 본인 여부 확인 미들웨어 추가
router.get('/', getOrdersByPotId);
router.post('/', verifyAuth, fileUpload.single('image'), createOrder);
router
  .route('/:orderId')
  .get(getOrderById)
  .patch(updateOrder)
  .delete(deleteOrder);

router.patch('/:orderId/order-confirm', confirmOrder);
router.patch('/:orderId/deposit-confirm', confirmDeposit);

export default router;
