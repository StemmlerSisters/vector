FROM alpine:3.22.1
RUN apk add bash openssh
COPY entry.sh /entry.sh
ENTRYPOINT ["bash", "/entry.sh"]
