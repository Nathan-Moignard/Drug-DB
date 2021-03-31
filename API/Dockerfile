FROM node:15.12-buster

WORKDIR /app

COPY . .

RUN npm install

CMD ["bash", "/wait-for-it.sh", "mongo:27017", "-t", "0", "--strict", "--", "npm", "start"]
