import { Router } from 'express';
import {
  getAuth,
  signUp,
  login,
  logout,
  kakaoLogin,
  kakaoLoginCallback,
  googleLogIn,
  googleLogInCallback,
} from '../controllers/auth.js';
import { verifyAuth } from '../middlewares/auth.js';
import passport from 'passport';

const router = Router();
router.get('/', verifyAuth, getAuth);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/kakao', kakaoLogin);
router.get('/kakao/callback', kakaoLoginCallback);
router.get('/google', googleLogIn());
router.get('/google/callback', googleLogInCallback());

export default router;
