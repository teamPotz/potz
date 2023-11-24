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
        console.log('kakaoId :', profile.id);
        console.log('name :', profile.username);
        const profileImage =
          profile._json.kakao_account.profile.profile_image_url;

        try {
          const user = await prisma.user.findUnique({
            where: {
              kakaoId: profile.id,
            },
          });
          if (user) {
            return done(null, user);
          } else {
            const newUser = await prisma.user.create({
              data: {
                kakaoId: profile.id,
                name: profile.username,
              },
            });
            const newProfile = await prisma.UserProfile.create({
              data: {
                userId: +newUser.id,
                imageUrl: profileImage,
              },
            });
            return done(null, user);
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
}
