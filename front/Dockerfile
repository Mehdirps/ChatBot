# Utilise l'image officielle de Node.js 20.18 pour le développement
FROM node:20.18

WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Expose le port 3000 pour le serveur de développement React
EXPOSE 3000

# Commande pour démarrer le serveur de développement
CMD ["npm", "start"]