# Stage 0, "build-stage"
FROM node:16-alpine as build-stage

WORKDIR /app/cliente

RUN npm install -g npm@latest
COPY . .
COPY .env.development ./.env
RUN npm install
RUN npm run build


# Stage 1, based on NGINX to provide a configuration to be used with react-router
FROM nginx:alpine
COPY --from=build-stage /app/cliente/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]









