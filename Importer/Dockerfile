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

CMD ["bash", "/drug-importer.sh"]
