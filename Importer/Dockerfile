FROM python:3.9.2-buster AS builder

WORKDIR /app

COPY . .

RUN mkdir sources sources/txt sources/json
RUN bash download.sh
RUN pip3 install typing
RUN python3 import.py


FROM mongo:3.6-xenial

WORKDIR /app

COPY --from=builder /app/sources/ /app/sources/

CMD ["bash", "/wait-for-it.sh", "mongo:27017", "--strict", "-t", "0", "--", "bash", "/drug-importer.sh"]
