FROM mhart/alpine-node:latest

# enviroment variables
ENV NODE_ENV production
ENV PORT 443

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --only=production

# Bundle app source
COPY . /usr/src/app

EXPOSE 443
CMD ["node", "server/index.js"]