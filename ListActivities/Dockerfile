FROM node:18-alpine

WORKDIR /app

CMD ["ls", "-la"]

RUN ls -la

COPY package.json ./

RUN npm i --package-lock-only

RUN npm ci

COPY . .

EXPOSE 5050

# CMD [ "npm", "run", "start" ]
