FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5050

CMD [ "npm", "run", "start" ]
