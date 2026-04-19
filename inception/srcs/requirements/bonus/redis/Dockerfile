FROM debian:buster

RUN apt-get update && \
    apt-get install -y redis-server && \
    rm -fr /var/lib/apt/lists/*

COPY tools/script.sh /tmp/script.sh

EXPOSE 6379

CMD [ "sh", "/tmp/script.sh" ]