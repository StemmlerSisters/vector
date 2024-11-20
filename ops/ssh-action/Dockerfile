FROM alpine:3.20.3
RUN apk add bash openssh
COPY entry.sh /entry.sh
ENTRYPOINT ["bash", "/entry.sh"]
