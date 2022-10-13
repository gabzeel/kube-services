FROM project-base as base

FROM node:16-alpine

WORKDIR /project

COPY --from=base /project .

RUN npm run prebuild && npm run build app

EXPOSE 3000

CMD ["node", "dist/apps/app/main.js"]