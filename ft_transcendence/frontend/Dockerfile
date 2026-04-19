FROM node:18.17.1-alpine AS development
ENV NODE_ENV=development
WORKDIR /home/node/app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
CMD ["npm", "run", "start"]


FROM node:18.17.1-alpine AS production-builder
ARG REACT_APP_FORTY_TWO_API_URI=${REACT_APP_FORTY_TWO_API_URI}
ARG REACT_APP_HOST_URI=${REACT_APP_FORTY_TWO_API_URI}
ENV NODE_ENV=production
WORKDIR /home/node/app
COPY --from=development /home/node/app .
RUN npm run build


FROM nginx:alpine-slim AS production
COPY ./devops-utils/config.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=production-builder /home/node/app/build .
