FROM node:16

WORKDIR /.

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6000

CMD npm audit fix && npm run dev