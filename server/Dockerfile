FROM node:21-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
EXPOSE 5000
RUN npx prisma generate
# RUN npx prisma migrate deploy
CMD ["npm", "run", "start"]