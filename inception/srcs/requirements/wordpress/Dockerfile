FROM debian:buster

COPY tools/script.sh /tmp/script.sh
COPY conf/wp-config.php /tmp/wp-config.php
COPY conf/www.conf /tmp/www.conf

RUN apt-get update && \
    apt-get install -y \
	lsb-release apt-transport-https ca-certificates curl mariadb-client \
	php7.3 php-cli php-fpm php-json php-mysqli php-curl && \
    rm -fr /var/lib/apt/lists/* && \
    # instal wordpress CLI
    apt-get update && apt-get install -y wget && \
    wget -O /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x /usr/local/bin/wp && \
    mkdir -p /var/www/wordpress /run/php

EXPOSE 9000

CMD [ "sh", "/tmp/script.sh" ]
