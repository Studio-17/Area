FROM node:19-alpine

USER node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . /home/node/app

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm" ]
CMD [ "run", "start:dev", "--tsc" ]