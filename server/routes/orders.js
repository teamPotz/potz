import { Router } from 'express';
import {
  getOrdersByPotId,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  confirmOrder,
  createOrderAndDeposit,
} from '../controllers/orders.js';
import { verifyAuth } from '../middlewares/auth.js';
import fileUpload from '../middlewares/multer.js';

const router = Router();
router.get('/', getOrdersByPotId);
router.post('/', verifyAuth, fileUpload.single('image'), createOrder);
router.post(
  '/pot-master',
  verifyAuth,
  fileUpload.single('image'),
  createOrderAndDeposit
);
router.patch('/:orderId/confirm', verifyAuth, confirmOrder);
router
  .route('/:orderId')
  .get(getOrderById)
  .patch(updateOrder)
  .delete(deleteOrder);

export default router;
