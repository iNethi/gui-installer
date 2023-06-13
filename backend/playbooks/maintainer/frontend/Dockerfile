FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm install -g npm@9.6.5
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]