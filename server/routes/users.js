import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import fileUpload from '../middlewares/multer.js';
import {
  getUserData,
  getUserDataById,
  getUserOrderDataById,
  deleteUserCommunity,
  updateUserById,
  updateUserAccountById,
  getUserDeliveryPotHistory,
  getNotifications,
  readAllNotifications,
} from '../controllers/users.js';

const router = Router();
router.get('/', getUserData);
router.get('/', verifyAuth, getUserData);
router.get('/user-info', verifyAuth, getUserDataById);
router.patch('/user-community/delete', verifyAuth, deleteUserCommunity);
router.get('/user-order', verifyAuth, getUserOrderDataById);
router.patch(
  '/update-profile',
  verifyAuth,
  fileUpload.single('image'),
  updateUserById
);
router.patch('/update-account', verifyAuth, updateUserAccountById);
router.get('/user-delivery-histories', verifyAuth, getUserDeliveryPotHistory);
router.get('/notification', verifyAuth, getNotifications);
router.patch('/notification', verifyAuth, readAllNotifications);

export default router;
