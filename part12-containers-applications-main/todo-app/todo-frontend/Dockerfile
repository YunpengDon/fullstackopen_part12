FROM node:20 AS dependencies
WORKDIR /usr/src/app
COPY package*.json package-lock.json ./
RUN npm ci

FROM node:20 AS test
WORKDIR /usr/src/app
# cooy dependencies
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# copy source codes
COPY . .
RUN npm test


FROM node:20 AS build-stage
WORKDIR /usr/src/app
ENV VITE_BACKEND_URL='/api'
COPY --from=test /usr/src/app .
RUN npm run build


FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html