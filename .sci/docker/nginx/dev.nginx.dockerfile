FROM nginx:1.15-alpine

COPY  ./docker/nginx/conf/dev.conf /etc/nginx/conf.d/default.conf
