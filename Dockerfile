FROM node:10.15.3-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm i && npm run web
EXPOSE 8080