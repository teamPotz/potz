import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './passport/index.js';

import authRouter from './routes/auth.js';
import communitiesRouter from './routes/communities.js';
import postsRouter from './routes/posts.js';
import ordersRouter from './routes/orders.js';
import communityTypeRouter from './routes/communityType.js';
import userRouter from './routes/users.js';
import categoryRouter from './routes/categories.js';

import { notFound, errorHandler } from './middlewares/error.js';

const app = express();
dotenv.config();
passportConfig();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: false,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/communities', communitiesRouter);
app.use('/posts', postsRouter);
app.use('/orders', ordersRouter);
app.use('/community-types', communityTypeRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log('> Server is up and running on port : ' + port)
);
