FROM node:14.18.0-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

RUN yarn add -g nodemon

COPY . ./app

EXPOSE 5000

CMD ["yarn", "start"]