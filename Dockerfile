FROM node:10.15.3-alpine
ENV APP_ROOT /app/

WORKDIR $APP_ROOT

COPY package*.json $APP_ROOT
RUN apk update \
  && npm install

COPY . $APP_ROOT
