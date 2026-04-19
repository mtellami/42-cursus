FROM debian:buster

COPY tools/script.sh /tmp/script.sh
COPY tools/my.sql /tmp/my.sql

RUN apt-get update && apt-get install -y mariadb-server gettext-base

EXPOSE 3306

CMD [ "sh", "/tmp/script.sh" ]
