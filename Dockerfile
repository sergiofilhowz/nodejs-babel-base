FROM node:9.11.2-slim as build-stage
ENV HOME=/home/app
COPY package.json yarn.lock .babelrc $HOME/
WORKDIR $HOME
RUN yarn && yarn cache clean
COPY src $HOME/src
RUN yarn build

# ----

FROM node:9.11.2-slim
ENV HOME=/home/app
COPY package.json yarn.lock $HOME/

WORKDIR $HOME
RUN yarn --production && yarn cache clean

# Bundle app source
COPY --from=build-stage /home/app/dist $HOME/
COPY config/ $HOME/config/
COPY src/db/ $HOME/db/

CMD [ "yarn", "production" ]
