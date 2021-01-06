FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm i link-module-alias

COPY . .

EXPOSE 8080

CMD npm run postinstall && npm run start:dev

