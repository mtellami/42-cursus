FROM node:18.17.1-alpine AS development
ENV NODE_ENV=development
WORKDIR /home/node/app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npx prisma generate
CMD [ "sh", "-c", "npx prisma db push && npm run start:dev" ]


FROM node:18.17.1-alpine AS production-build
ENV NODE_ENV=production
WORKDIR /home/node/app
COPY --from=development /home/node/app .
RUN npm run build


FROM node:18.17.1-alpine AS production
USER node
WORKDIR /home/node/app
COPY --from=production-build --chown=node:node /home/node/app .
RUN mkdir /home/node/avatar-images && chown -R node:node /home/node/avatar-images
CMD [ "sh", "-c", "npx prisma db push && node dist/src/main" ]
