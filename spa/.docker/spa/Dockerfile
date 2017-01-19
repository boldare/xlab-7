FROM node:6.9.3

ADD entrypoint.sh /entrypoint.sh
RUN chmod 755 /*.sh

WORKDIR /app

CMD ["/entrypoint.sh"]
