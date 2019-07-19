FROM node:10

WORKDIR /usr/src/prms

COPY package.json /usr/src/prms

RUN npm install

COPY . .

EXPOSE 7001

CMD ["npm", "start"]