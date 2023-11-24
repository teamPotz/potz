import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default function () {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/login/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await prisma.user.findUnique({
            where: {
              kakaoId: String(profile.id),
            },
          });

          if (exUser) {
            return done(null, exUser);
          }

          const newUser = await prisma.user.create({
            data: {
              kakaoId: String(profile.id),
              name: profile.username,
              profile: {
                create: {
                  imageUrl:
                    profile._json?.kakao_account?.profile.profile_image_url,
                },
              },
            },
          });
          done(null, newUser);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
}
