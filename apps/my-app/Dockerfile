FROM project-base as base

FROM node:16-alpine

WORKDIR /project

COPY --from=base /project .

RUN npm run prebuild && npm run build my-app

EXPOSE 3001

CMD ["node", "dist/apps/my-app/main.js"]