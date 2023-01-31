FROM node:18-alpine

RUN apk add --no-cache python3 make g++ curl

USER node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY --chown=node:node . /home/node/app
RUN npm install

RUN npm uninstall bcrypt
RUN npm install bcrypt

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD [ "run", "start:dev", "--tsc" ]