FROM node:18.16.1-alpine3.18

ENV NODE_ENV=dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]