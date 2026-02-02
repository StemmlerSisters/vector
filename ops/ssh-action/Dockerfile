FROM alpine:3.23.3
RUN apk add bash openssh
COPY entry.sh /entry.sh
ENTRYPOINT ["bash", "/entry.sh"]
