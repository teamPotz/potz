import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js';
import communitiesRouter from './routes/communities.js';
import postsRouter from './routes/posts.js';
import ordersRouter from './routes/orders.js';

const app = express();
dotenv.config();
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
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/communities', communitiesRouter);
app.use('/posts', postsRouter);
app.use('/orders', ordersRouter);

app.listen(port, () =>
  console.log('> Server is up and running on port : ' + port)
);
