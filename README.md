# Projet_Docker Sébastien Gosselin

# Forum Anonyme Dockerisé

Ce projet comprend deux services principaux, `Sender` et `Thread`, chacun exécuté dans un conteneur Docker.

## Construction des Images

Pour construire les images Docker de chaque service :

- **Sender** :

`docker build -t haykes/sender:latest -f sender/Dockerfile sender`

- **Thread** :


`docker build -t haykes/thread:latest -f thread/Dockerfile thread`


## Lancement des Services

Utilisez Docker Compose pour démarrer les services :

`docker-compose up -d`


## Accès aux Services

- **Thread** est accessible à http://localhost/.
- **Sender** est accessible à http://localhost:8080/.

## Images Docker sur Docker Hub

Les images Docker sont disponibles sur Docker Hub :

- [Sender](https://hub.docker.com/r/haykes/sender)
- [Thread](https://hub.docker.com/r/haykes/thread)
