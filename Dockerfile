FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8228

CMD ["node", "server.js"]