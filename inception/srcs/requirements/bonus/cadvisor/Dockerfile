FROM debian:buster

RUN apt-get update -y && \
    apt-get install wget -y && \
    wget https://github.com/google/cadvisor/releases/download/v0.37.0/cadvisor && \
    chmod +x cadvisor

EXPOSE 8080

CMD ["./cadvisor"]