FROM node:16-buster-slim

USER node

# default to port 19006 for node, and 19001 and 19002 (tests) for debug
ARG PORT=19006

ENV PORT $PORT
EXPOSE $PORT 19001 19002

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
ENV PATH /home/node/app/.bin:$PATH

RUN mkdir /home/node/app && chown node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . /home/node/app

RUN npm i --unsafe-perm -g npm@latest expo-cli@latest
RUN npm install
RUN npx expo login -u manulop -p Reaccoon

ENTRYPOINT [ "npm" ]
CMD [ "run", "web" ]