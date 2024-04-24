FROM node:18-alpine

WORKDIR /app

COPY ListActivities/package*.json ./

RUN echo "List content in /app" && pwd && ls -la

RUN npm ci

COPY ListActivities/. .

RUN echo "List content in /app" && pwd && ls -la

EXPOSE 5050

CMD [ "npm", "run", "start" ]
