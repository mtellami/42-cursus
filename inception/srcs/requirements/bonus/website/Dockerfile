FROM debian:buster

COPY conf/nginx.conf /tmp/nginx.conf

RUN apt-get update && apt-get install -y nginx && \
    cp /tmp/nginx.conf /etc/nginx/conf.d/nginx.conf

COPY tools/site /var/www/html

EXPOSE 4000

CMD [ "nginx", "-g", "daemon off;" ]
