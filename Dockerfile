FROM node:latest

COPY . .

RUN npm install

EXPOSE 10000

CMD ["node", "index.js"]
