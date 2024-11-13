FROM node:18-alpine

# Create app directory
WORKDIR /orchestrator

# Install app dependencies
COPY package*.json /orchestrator

RUN npm install

# Bundle app source
COPY . /orchestrator

ENV PORT=3000

CMD [ "node", "app.js" ]
