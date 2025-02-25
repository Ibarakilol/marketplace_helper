FROM node:20 AS build-stage

COPY . /app
WORKDIR /app

RUN yarn install
RUN yarn build

FROM nginx:1
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
