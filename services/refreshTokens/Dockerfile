FROM node:18-alpine

# Create app directory
WORKDIR /services/refreshTokens

# Install app dependencies
COPY package*.json /services/refreshTokens

RUN npm install

# Bundle app source
COPY . /services/refreshTokens

ENV PORT=3001

CMD [ "node", "app.js" ]
