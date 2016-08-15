FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 8080

RUN npm install
RUN npm run test
RUN npm run build
RUN npm run production
