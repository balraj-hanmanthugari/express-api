FROM node:14

# Create app work directory
WORKDIR /usr/src/express-api-app

# Copy all the files to the work directory from current directory
COPY ./ ./

# Install app dependencies
RUN npm ci

CMD [ "node", "app.js" ]
