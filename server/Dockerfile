FROM node:21-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
RUN npx prisma generate
RUN npm i -g pm2
EXPOSE 5000
# RUN npx prisma migrate deploy
CMD ["npm", "run", "start"]