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

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/authorize',
    failureRedirect: 'http://localhost:5173/login',
  }),
  function (req, res) {}
);

export default router;
