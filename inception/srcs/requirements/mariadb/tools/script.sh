#!/bin/sh

sed -i 's/bind-address            = 127.0.0.1/bind-address            = 0.0.0.0/g' /etc/mysql/mariadb.conf.d/50-server.cnf

service mysql start

envsubst < /tmp/my.sql | mysql

kill $(cat /var/run/mysqld/mysqld.pid)

mysqld