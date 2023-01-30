FROM node:16.10-alpine

RUN apk add --no-cache python3 make g++

USER node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY --chown=node:node . /home/node/app
RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD [ "run", "start:dev", "--tsc" ]
