FROM phpmyadmin:apache AS phpmyadmin

WORKDIR /app
ENV PMA_ARBITRARY=1
ENV PMA_HOST=MariaDB
EXPOSE 80

# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update
RUN apt-get -y install wget \
    augeas-lenses libaugeas0 libexpat1-dev libffi-dev libmpdec2 libpython-dev \
    libpython-stdlib libpython2-dev libpython2-stdlib libpython2.7 \
    libpython2.7-dev libpython2.7-minimal libpython2.7-stdlib libpython3-stdlib \
    libpython3.7-minimal libpython3.7-stdlib libreadline7 libssl-dev python \
    python-dev python-minimal python-pip-whl python-pkg-resources \
    python-virtualenv python2 python2-dev python2-minimal python2.7 \
    python2.7-dev python2.7-minimal python3 python3-distutils python3-lib2to3 \
    python3-minimal python3-pkg-resources python3-virtualenv python3.7 \
    python3.7-minimal readline-common virtualenv

RUN wget https://dl.eff.org/certbot-auto
RUN mv certbot-auto /usr/local/bin/certbot-auto
RUN chown root /usr/local/bin/certbot-auto
RUN chmod 0755 /usr/local/bin/certbot-auto
RUN /usr/local/bin/certbot-auto certonly --no-bootstrap -n --webroot --webroot-path=/var/www/html/ --register-unsafely-without-email --domains nmoignard.fr.nf --agree-tos

# FROM certbot/certbot AS certbot

# RUN certonly --apache

# Collecting Drug List
# FROM ubuntu:20.04 AS sql

# ENV TZ=Europe/Paris

# WORKDIR /app
# COPY . .

# RUN mkdir ./scripts/data

# RUN apt-get update
# RUN apt-get -y install npm curl
# RUN npm install

# RUN ./scripts/download.sh
# RUN ./scripts/importer.sh
