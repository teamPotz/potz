import passport from 'passport';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAuth(req, res, next) {
  try {
    // res.status(200).json({
    //   id: req.user.id,
    //   email: req.user.email,
    //   name: req.user.name,
    //   isAuth: true,
    //   role: req.user.role,
    //   imageUrl: req.user.imageUrl,
    //   // todo : 방장 체크
    //   // isAdmin: req.user.role === 0 ? false : true,
    // });

    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function signUp(req, res, next) {
  const { email, password, name } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      res.status(400);
      throw new Error('email exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }

      const { password, ...userWithoutPassword } = newUser;
      return res.json(userWithoutPassword);
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }

      if (!user) {
        console.log(info.message);
        throw new Error(info.message);
      }

      // 로그인 성공
      return req.login(user, (err) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.json(user);
      });
    })(req, res, next);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export function logout(req, res, next) {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy();
      res.status(200).json({ success: true, message: 'logout success' });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export function kakaoLogin(req, res, next) {
  return passport.authenticate('kakao')(req, res, next);
}

export function kakaoLoginCallback(req, res, next) {
  passport.authenticate('kakao', (err, user) => {
    try {
      if (err) {
        console.error(err);
        throw err;
      }

      if (!user) {
        throw new Error('error');
      }

      req.login(user, (err) => {
        if (err) {
          console.error(err);
          throw err;
        }
        res.redirect('http://localhost:5173/');
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  })(req, res, next);
}
