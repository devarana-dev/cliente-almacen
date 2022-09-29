# Node Version
FROM node:16-alpine

WORKDIR /usr/src/app

# Install PM2 globally and npm updated
RUN npm install --global pm2
RUN npm install -g npm@8.19.2
RUN npm install -g serve

# Copy Files
COPY . .

# Install dependencies
RUN npm install
# Build App
RUN npm run Build

# Expose the listening port
EXPOSE 3000

# Run container as non-root user
USER node

# Run npm start script
CMD [ "npm", "-s", "build" ]




