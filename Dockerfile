FROM node:14 as base

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

CMD npm run start

EXPOSE 3000