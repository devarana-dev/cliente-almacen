# Stage 0, "build-stage"
FROM node:16-alpine as build-stage
WORKDIR /app
RUN npm install --global pm2
RUN npm install -g npm@8.19.2
RUN npm install -g serve
COPY . .
RUN npm install
RUN npm run build


# Stage 1, based on NGINX to provide a configuration to be used with react-router
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Run container as non-root user
CMD ["nginx", "-g", "daemon off;"]








