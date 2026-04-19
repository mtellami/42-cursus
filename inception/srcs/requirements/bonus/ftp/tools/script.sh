#!/bin/bash

cp /tmp/vsftpd.conf /etc/vsftpd.conf && \

adduser --disabled-password --gecos "" $FTP_USER && \
echo "$FTP_USER:$FTP_PASSWORD" | /usr/sbin/chpasswd && \
echo "$FTP_USER" | tee -a /etc/vsftpd.userlist && \

mkdir -p /var/www/html && \
mkdir -p /var/run/vsftpd/empty &&\

chown nobody:nogroup /var/www/html && \
chmod a-w /var/www/html &&\
chown $FTP_USER:$FTP_USER /var/www/html && \

/usr/sbin/vsftpd /etc/vsftpd.conf
