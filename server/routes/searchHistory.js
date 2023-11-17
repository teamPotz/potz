import { Router } from 'express';
import {
  getSearchHistory,
  createSearchHistory,
  deleteSearchHistory,
} from '../controllers/searchHistory.js';

const router = Router();

router.get('/', getSearchHistory);
router.post('/', createSearchHistory);
router.delete('/:keyword', deleteSearchHistory);

export default router;
