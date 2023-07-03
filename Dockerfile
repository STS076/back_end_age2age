FROM debian:10

# LABEL org.opencontainers.image.source https://github.com/sts076/back_end_age2age

RUN apt-get update -yq \
&& apt-get install curl gnupg -yq \
&& curl -sL https://deb.nodesource.com/setup_18.x | bash \
&& apt-get install nodejs -yq \
&& apt-get clean -y

# ADD . /app/

COPY . /app

RUN cd /app

WORKDIR /app

RUN echo ls -al
RUN npm install
RUN npm install express
RUN npm run build

EXPOSE 3000

CMD npm run start