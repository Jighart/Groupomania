# Groupomania

Projet 7 de la formation OpenClassrooms. Le but est de concevoir un réseau social interne à la société Groupomania. Il s'agit d'un projet MERN (Mongo, Express, React, Node).

## Installation

Tout d'abord, clonez ce repository qui contient le front et le back.

### Backend

Depuis la racine du projet, installez les modules puis lancez le serveur

        > npm install
        > npm start

L'API par défaut sur le port 5000.

### Frontend

Depuis le dossier client, installez les modules et lancez l'application

        > cd client
        > npm install
        > npm start

Le client tourne par défaut sur le port 3000.

## Variables d'environnement

Le site utilise plusieurs variables d'environnement regroupées dans deux fichiers .env:

        > config/.env pour le backend
        > client/.env pour le frontend

Celle du frontend continent notamment le userId du compte désigné comme administrateur. Afin de tester le site correctement, ces deux fichiers sont ajoutés sur le repository.

## Crash lors d'un upload d'image

En raison d'une incompatibilité entre Node et multer, [cette erreur](https://test-import.gitlabproservices.com/gkoltsov/node1/-/issues/38058) peut se produite lors de l'envoi d'un post contenant une image. Afin d'y remédier, vous pouvez faire tourner le serveur en utilisant une version plus ancienne de Node, j'ai ici utilisé la version 14.18.0 via [nvm](https://github.com/nvm-sh/nvm).
