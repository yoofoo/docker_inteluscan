FROM node:10

WORKDIR /usr/src/grp

COPY package.json /usr/src/grp

RUN npm install

COPY . .

EXPOSE 7000

CMD ["npm", "start"]