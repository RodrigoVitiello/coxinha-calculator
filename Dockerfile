FROM node:14

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN apt-get install git

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --pure-lockfile
RUN yarn global add react-scripts@3.4

COPY . ./

CMD ["yarn", "start"]
