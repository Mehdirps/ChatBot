# Utilise l'image officielle de Node.js 20.18 pour construire le frontend
FROM node:20.18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Construction du projet
RUN npm run build

# Utilise Nginx pour servir les fichiers en production
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]