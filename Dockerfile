FROM debian:10

# Mise à jour de la liste des paquets
RUN apt-get update -yq

# Installation de curl, gnupg et Node.js
RUN apt-get install -yq curl gnupg
RUN apt-get install nano
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -yq nodejs
RUN apt-get install -yq openssl

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

RUN mkdir certificate
RUN openssl req -x509 -newkey rsa:4096 -keyout certificate/key.pem -out certificate/cert.pem -days 365 -nodes -subj '/CN=localhost'


# Exposition du port
EXPOSE 3000

# Commande de démarrage du service
CMD ["npm", "run", "start"]
