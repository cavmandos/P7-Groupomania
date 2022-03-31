### Groupomania Social-Network ###
## P7 Openclassrooms Franck Lebeau ##

# BACKEND #############################
Dépendances : bcrypt, cors, dotenv, express, jsonwebtoken, multer, mysql et nodemon.

# Installation :
1. Cloner ce repository.
2. Installer NodeJs, Npm.
3. (terminal) npm init
4. Installer (npm install) les dépendances du package.json
# Lancer le server :
Utiliser nodemon server pour lancer le backend.


# DATABASE ############################
1. Le schéma de la base de donnée à importer est contenu dans le fichier "Groupomania.sql"
2. Créer un fichier .env dans le dossier backend et y insérer les raccourcis/accès indiqués ici pour la base de donnée et le système de token :

DATABASE = groupomania, 
DATABASE_HOST = localhost, 
DATABASE_USER = root,
DATABASE_PASSWORD = !2mySQL 

Le nom du token est également à insérer dans le fichier .env : 
TOKEN = 'RANDOM_TOKEN_SECRET'

## FRONTEND ###########################
Dépendances : axios, core-js, sweetalert2, vue, vue-router, vuetify et vuex.

## Installation
1. Cloner ce repository
2. Installer npm
### Lancer le serveur frontend
3. (terminal) npm run serve
### Compiler/Minifier pour production
(terminal) npm run build
### Linter
(terminal)npm run lint
