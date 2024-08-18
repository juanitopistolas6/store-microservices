FROM node:20.16-alpine

WORKDIR /app/shopping

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]