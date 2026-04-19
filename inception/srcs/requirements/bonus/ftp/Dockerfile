FROM debian:buster

COPY tools/script.sh /tmp/script.sh
COPY conf/vsftpd.conf /tmp/vsftpd.conf

RUN apt-get update && \
    apt-get install -y vsftpd

EXPOSE 21 1030

CMD [ "sh", "/tmp/script.sh" ]