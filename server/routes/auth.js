import { Router } from 'express';
import {
  getAuth,
  signUp,
  login,
  logout,
  kakaoLogin,
  kakaoLoginCallback,
  googleLogInCallback,
  googleLogIn,
} from '../controllers/auth.js';
import { verifyAuth } from '../middlewares/auth.js';
// import passport from '../passport/index.js';
import passport from 'passport';

const router = Router();

router.get('/', verifyAuth, getAuth);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/login/kakao', kakaoLogin());
router.get('/login/kakao/callback', kakaoLoginCallback());

router.get('/google', googleLogIn());

router.get('/google/callback', googleLogInCallback());

export default router;
