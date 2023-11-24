import { Router } from 'express';
import { getAuth, signUp, login, logout } from '../controllers/auth.js';
import { verifyAuth } from '../middlewares/auth.js';
import passport from 'passport';

const router = Router();

router.get('/', verifyAuth, getAuth);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);

router.get('/kakao', passport.authenticate('kakao'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: 'http://localhost:5173/',
  }),
  (req, res) => {
    res.redirect('http://localhost:5173/home'); // 성공 시 이동
  }
);

export default router;
