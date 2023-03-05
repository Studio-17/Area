FROM node:16.17.1-alpine3.15

WORKDIR /app

COPY . .

RUN npm install -g expo-cli eas-cli

RUN apk add git jq

RUN git init

RUN sh ./build.sh

CMD ["echo", "App built"]