FROM node:20-alpine as build

COPY . /app
WORKDIR /app

RUN yarn install
RUN yarn build

FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
