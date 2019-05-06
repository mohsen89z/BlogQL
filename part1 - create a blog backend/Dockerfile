FROM node:10-alpine as Builder

WORKDIR /app

ADD .npmrc /app
ADD package.json /app
RUN npm install

ADD . /app

RUN npm run build


FROM node:10-alpine

WORKDIR /app
ENV NODE_ENV production

COPY --from=Builder /app/.npmrc /app
COPY --from=Builder /app/package.json /app

RUN npm i

COPY --from=Builder /app/dist /app/dist

CMD ["npm", "run", "prod"]