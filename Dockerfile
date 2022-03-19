FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install
RUN npm install

# Bundle app source
COPY . .
RUN npm run build

EXPOSE 17088
CMD [ "npm", "run", "start" ]
