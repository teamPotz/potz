import { getCategoryById } from '../controllers/categories.js';

import { Router } from 'express';

const router = Router();
router.route('/:id').get(getCategoryById);

export default router;
