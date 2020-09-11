FROM node:12
WORKDIR	/dependencies
COPY package.json /dependencies
RUN npm install
COPY . /dependencies
RUN npm run-script build
CMD node src/server.js
EXPOSE 8080
