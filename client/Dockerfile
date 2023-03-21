FROM node:14.18.0-alpine

ENV CI=true
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY .env.development /app

RUN yarn install

COPY . /app

EXPOSE 3000

CMD ["yarn", "start:development"]