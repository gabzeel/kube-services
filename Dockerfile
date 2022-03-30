FROM node:16-alpine

WORKDIR /project

COPY package.json .

RUN npm install --silent

COPY . .

