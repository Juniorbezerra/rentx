FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN yarn -i

COPY . .

EXPOSE 3333

CMD ["yarn","dev"]