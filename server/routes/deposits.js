import { Router } from 'express';
import { createDeposit, confirmDeposit } from '../controllers/deposits.js';
import { verifyAuth } from '../middlewares/auth.js';
import fileUpload from '../middlewares/multer.js';

const router = Router();
router.post('/', verifyAuth, fileUpload.single('image'), createDeposit);
router.patch('/:depositId/confirm', verifyAuth, confirmDeposit);

export default router;
