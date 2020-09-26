# Collecting Drug List
FROM ubuntu:20.04 AS sql

ENV TZ=Europe/Paris
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
COPY . .
RUN mkdir ./scripts/data

RUN apt-get update
RUN apt-get -y install npm curl
RUN npm install

RUN ./scripts/download.sh
RUN ./scripts/importer.sh


# Build PHPMyAdmin
FROM phpmyadmin:apache AS phpmyadmin

WORKDIR /app
ENV PMA_ARBITRARY=1
ENV PMA_HOST=MariaDB
EXPOSE 443

RUN a2enmod ssl && mkdir /etc/apache2/ssl
RUN openssl req -batch -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/apache2/ssl/apache.key -out /etc/apache2/ssl/apache.crt
COPY ./ssl/default-ssl.conf /etc/apache2/sites-available/default-ssl.conf
RUN a2ensite default-ssl

# CMD certbot -n --apache --register-unsafely-without-email --domains nmoignard.fr.nf --agree-tos ; service apache2 start ; tail -f /dev/null