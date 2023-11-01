import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js';
import postRouter from './routes/post.js';

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
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/post', postRouter);

app.listen(port, () =>
  console.log('> Server is up and running on port : ' + port)
);
