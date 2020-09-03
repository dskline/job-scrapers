FROM node:12-alpine

WORKDIR /usr/app
COPY package*.json /usr/app/
RUN npm ci --quiet
COPY . /usr/app/

RUN npm run build
