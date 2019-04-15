FROM node:10.1
WORKDIR /usr/client/app
COPY . /usr/client/app
RUN npm install
EXPOSE 8080
ENTRYPOINT [ "npm", "run web" ]