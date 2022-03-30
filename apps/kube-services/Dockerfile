FROM project-base as base

FROM node:16-alpine

WORKDIR /project

COPY --from=base /project .

RUN npm run prebuild && npm run build kube-services

EXPOSE 3000

CMD ["node", "dist/apps/kube-services/main.js"]