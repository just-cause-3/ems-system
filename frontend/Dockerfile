FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]


