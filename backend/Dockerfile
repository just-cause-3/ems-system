FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production && npm cache clean --force

COPY . .

ENV PORT=4000
EXPOSE 4000

CMD ["node", "server.js"]


