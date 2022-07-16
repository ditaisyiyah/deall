FROM node:16

# Create app directory
WORKDIR /services/users

# Install app dependencies
COPY package*.json /services/users

RUN npm install

# Bundle app source
COPY . /services/users

ENV PORT 3002

CMD [ "node", "app.js" ]
