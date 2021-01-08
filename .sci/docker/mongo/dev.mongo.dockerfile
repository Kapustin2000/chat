FROM mongo:4

COPY  ./docker/mongo/conf/dev.conf /etc/mongod.conf.orig
