FROM node:14-alpine as base

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn run build

CMD yarn run start:prod

EXPOSE 3000