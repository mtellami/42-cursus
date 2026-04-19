FROM nginx:alpine-slim AS development
COPY development.conf /etc/nginx/conf.d/default.conf
CMD ["sh", "-c", "nginx -g 'daemon off;' > /dev/null 2>&1"]


FROM nginx:alpine-slim AS production
COPY production.conf /etc/nginx/conf.d/default.conf
