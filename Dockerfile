FROM node

RUN apt-get update

RUN mkdir /home/ngx-bootstrap

WORKDIR  /home/ngx-bootstrap

COPY ./ ./

RUN rm -rf ./node_modules

RUN npm i

RUN npm run build

RUN npm run link

RUN npm run build:dynamic

EXPOSE 3000

CMD ["node", "demo/dist/server.js"]

