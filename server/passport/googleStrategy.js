import { PrismaClient } from '@prisma/client';
import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';

const prisma = new PrismaClient();

export default function () {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userId = profile.id;
          const userProfileImageURL = profile.photos[0].value;
          const userName = profile.displayName;

          const user = await prisma.user.findUnique({
            where: { googleId: userId },
          });

          if (user) {
            return done(null, user);
          }

          const newUser = await prisma.user.create({
            data: {
              googleId: String(userId),
              name: userName,
              profile: {
                create: {
                  imageUrl: userProfileImageURL,
                },
              },
            },
          });
          done(null, newUser);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
}
