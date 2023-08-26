FROM debian:10

# Mise à jour de la liste des paquets
RUN apt-get update -yq

# Installation de curl, gnupg et Node.js
RUN apt-get install -yq curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -yq nodejs
RUN apt-get install mysql-client

# Installation de PM2
RUN npm install pm2 -g

# Définition du répertoire de travail et copie des fichiers
WORKDIR /app
COPY . /app

# Installation des dépendances et construction du projet
RUN npm install
RUN npm install express
RUN npm install typescript
RUN npm run build

RUN mkdir -p /app/app/config && \
    touch /app/app/config/db.config.json && \
    echo '{"database": {  "host": "db_recette",  "port": 3306,  "user": "sophie",  "password": "sophie",  "database": "CUBE"},"secret": "25ad17cf-ebda-4147-9abe-b1b5148664f5"}' >> /app/app/config/db.config.json


# Exposition du port
EXPOSE 3000

# Commande de démarrage du service
CMD ["npm", "run", "start"]
