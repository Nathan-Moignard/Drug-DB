FROM ubuntu:20.04 AS sql

ENV TZ=Europe/Paris
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
COPY . .

RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install npm curl
RUN npm install

RUN ./scripts/download.sh
RUN ./scripts/importer.sh
