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
router.patch('/update-account', updateUserAccountById);
export default router;
