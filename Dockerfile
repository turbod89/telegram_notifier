FROM node:11
LABEL Author="Daniel Torres"

# install git
RUN apt-get -y update \
    && apt-get -y upgrade \
    && apt-get -y install git

# install apidocjs
RUN npm install -g apidoc

EXPOSE 3000

# map and mount
VOLUME ["/app"]
VOLUME ["/repos"]
VOLUME ["/root"]
WORKDIR /app
CMD ["/bin/bash"]