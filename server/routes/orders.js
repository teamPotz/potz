import { Router } from 'express';
import {
  getOrdersByPotId,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  confirmOrder,
} from '../controllers/orders.js';
import { verifyAuth } from '../middlewares/auth.js';
import fileUpload from '../middlewares/multer.js';

const router = Router();
router.get('/', getOrdersByPotId);
router.post('/', verifyAuth, fileUpload.single('image'), createOrder);
router.patch('/:orderId/confirm', verifyAuth, confirmOrder);
// todo : 주문 수정, 삭제 등
router
  .route('/:orderId')
  .get(getOrderById)
  .patch(updateOrder)
  .delete(deleteOrder);

export default router;
