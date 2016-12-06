FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y python curl git
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

#Install Node.js v6.x
RUN apt-get install -y nodejs

#Install node module
RUN npm i -g yarn


RUN mkdir /home/ng2-bootstrap
WORKDIR /home/ng2-bootstrap
COPY ./ ./
RUN yarn


ARG SAUCE_ACCESS_KEY
ENV SAUCE_ACCESS_KEY ${SAUCE_ACCESS_KEY}

ARG SAUCE_USERNAME
ENV SAUCE_USERNAME ${SAUCE_USERNAME}
