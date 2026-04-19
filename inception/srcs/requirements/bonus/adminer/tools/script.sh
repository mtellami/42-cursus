#!/bin/sh

sed -i "s|listen = /run/php/php7.3-fpm.sock|listen = 7000|g" /etc/php/7.3/fpm/pool.d/www.conf

mkdir -p /var/www/wordpress/adminer /run/php

curl -s -L https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1-mysql-en.php \
    --output /var/www/wordpress/adminer/index.php

php-fpm7.3 -F