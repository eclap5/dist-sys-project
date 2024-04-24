FROM node:18-alpine

WORKDIR /app

COPY DatabaseControllerMicroservice/package*.json ./

RUN echo "List content in /app" && pwd && ls -la

RUN npm ci

COPY DatabaseControllerMicroservice/. .

RUN echo "List content in /app" && pwd && ls -la

EXPOSE 3001

CMD ["npm", "run", "watch"]
