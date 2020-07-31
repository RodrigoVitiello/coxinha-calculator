FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY . ./

CMD ["yarn", "start"]
