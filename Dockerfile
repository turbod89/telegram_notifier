FROM node:11
LABEL Author="Daniel Torres"

RUN apt-get -y update \
    && apt-get -y upgrade \
    && apt-get -y install git \
    && npm install -g apidoc

EXPOSE 3000

# map and mount
VOLUME ["/app"]
VOLUME ["/repos"]
VOLUME ["/root/.ssh"]
WORKDIR /app
CMD ["/bin/bash"]