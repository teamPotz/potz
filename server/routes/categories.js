import { getCategoryById, getCategory } from '../controllers/categories.js';

import { Router } from 'express';

const router = Router();

router.get('/', getCategory);
router.route('/:id').get(getCategoryById);

export default router;
