FROM debian:buster

RUN	apt-get update && \
    apt-get install -y curl \
	php7.3 php7.3-fpm php7.3-mysql && \
    rm -rf /var/lib/apt/lists/*

COPY tools/script.sh /tmp/script.sh

EXPOSE 7000

CMD [ "sh", "/tmp/script.sh" ]