import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default function () {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email },
            include: {
              profile: true,
              // communities: {
              //   select: {
              //     communityId: true,
              //     joinedAt: true,
              //   },
              // },
            },
          });

          if (!user || !(await bcrypt.compare(password, user.password))) {
            return done(null, false, {
              message: 'Invalid username or password.',
            });
          }

          const { password: pw, ...userWithoutPassword } = user;
          return done(null, userWithoutPassword);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
}
