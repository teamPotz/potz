import { Router } from 'express';
import { getAuth, signUp, login, logout } from '../controllers/auth.js';
import { verifyAuth } from '../middlewares/auth.js';
import passport from 'passport';

const router = Router();

router.get('/', verifyAuth, getAuth);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/login/kakao', passport.authenticate('kakao'));
router.get('/login/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}),
(req, res) => {
    res.redirect('/');
} );

export default router;
