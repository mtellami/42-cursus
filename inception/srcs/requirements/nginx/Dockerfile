FROM debian:buster

COPY tools/script.sh /tmp/script.sh
COPY conf/nginx.conf /tmp/nginx.conf

RUN apt-get update && \
    apt-get install -y nginx openssl && \
    chmod +x /tmp/script.sh && /tmp/script.sh

EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]