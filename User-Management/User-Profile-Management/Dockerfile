FROM node:10

WORKDIR /usr/src/prfl

COPY package.json /usr/src/prfl

RUN npm install

COPY . .

EXPOSE 7002

CMD ["npm", "start"]