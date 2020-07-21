FROM node:13

RUN yarn global add nodemon

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN yarn install

COPY . /usr/src/app

EXPOSE 3000

CMD ["yarn", "start"]
