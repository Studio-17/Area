FROM node:18-alpine

RUN apk add --no-cache python3 make g++ curl

USER node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm install

EXPOSE 4000

ENTRYPOINT ["npm"]
CMD [ "run", "start:dev", "--tsc" ]
