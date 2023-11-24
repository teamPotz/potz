import { Router } from 'express';
import { getAuth, signUp, login, logout, kakaoLogin, kakaoLoginCallback } from '../controllers/auth.js';
import { verifyAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', verifyAuth, getAuth);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/login/kakao', kakaoLogin());
router.get('/login/kakao/callback', kakaoLoginCallback());

export default router;
