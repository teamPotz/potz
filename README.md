# POTZ

## how to run

1. set env

   .env.example 파일명을 .env로 변경하고 해당 항목의 환경변수 값을 세팅

2. run mysql with Docker

   ```bash
   cd server
   docker compose up -d
   npx prisma migrate deploy
   ```

3. run server

   ```bash
   cd client
   npm i
   npm run dev
   ```

4. run client

   ```bash
   cd server
   npm i
   npm run dev
   ```
