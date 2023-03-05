FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8081

ENTRYPOINT [ "npm" ]
CMD [ "start" ]