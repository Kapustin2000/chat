FROM nginx:1.15-alpine

COPY  ./docker/nginx/conf/local.conf /etc/nginx/conf.d/nginx.conf
