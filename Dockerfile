FROM node:20-alpine3.18 

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 10000

CMD ["node", "index.js"]
