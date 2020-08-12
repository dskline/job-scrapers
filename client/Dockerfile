FROM node:12-alpine

WORKDIR /usr/app
COPY package.json .
COPY package-lock.json .
RUN npm ci --quiet
COPY . .
