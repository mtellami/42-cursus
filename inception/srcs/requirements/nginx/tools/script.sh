#!/bin/sh

# Create selt-signed SSL certificate
mkdir -p /etc/nginx/certs && \
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-keyout "/etc/nginx/certs/server.key" -out "/etc/nginx/certs/server.crt" \
	-subj "/CN=mtellami.42.fr"

# Configuration
cp /tmp/nginx.conf "/etc/nginx/conf.d/nginx.conf"
