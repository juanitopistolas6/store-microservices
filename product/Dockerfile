FROM node:20.16-alpine

WORKDIR /app/product

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]