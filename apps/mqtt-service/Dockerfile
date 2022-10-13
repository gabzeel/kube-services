FROM project-base as base

FROM node:16-alpine

WORKDIR /project

COPY --from=base /project .

RUN npm run prebuild && npm run build mqtt-service

CMD ["node", "dist/apps/mqtt-service/main.js"]