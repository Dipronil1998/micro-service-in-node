FROM node:16

WORKDIR /.

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7000

CMD npm run dev