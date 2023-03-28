[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

![ts](https://flat.badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)

<div id="top"></div>

<!--
*** Inspired by the Best-README-Template.
*** Let's create something AMAZING! :D

*** GitLab Flavored Markdown - https://gitlab.com/gitlab-org/gitlab/-/blob/master/doc/user/markdown.md
-->

<div align="center">
  <h1>Simple Bank</h1>
</div>

## 📍 About The Project

`Simple Bank` is a banking application, that mimic the real life banking apps

`https://documenter.getpostman.com/view/6225567/2s93JzLfn8` Documentation

`` Frontend application

`` Backend application

## DB MODEL

![DB MODEL](https://github.com/tobslob/simpleBank/blob/staging/simple-bank-DB-model.png?raw=true)

## UML CLASS DIAGRAM
![UML CLASS DIAGRAM](https://github.com/tobslob/simpleBank/blob/staging/UML-Class-Diagram.png?raw=true)

# Running locally

To start the application in dev mode, please run:

```sh
git clone https://github.com/tobslob/simpleBank.git
```

```sh
cd simpleBank
```

```sh
 yarn install
```

```sh
 add `.env` to root folder, copy the .env.example
```

```sh
 yarn watch
```

```sh
 yarn start:dev
```

## Running using docker compose

Install PostgreSQL on local machine using the following command:

```sh
docker pull postgres

## 1. We will create a local folder and mount it as a data volume for our running container to store all the database files in a known location.

mkdir ${HOME}/postgres-data/
## 2. run the postgres image

docker run -d --name dev-postgres \
 --restart=always \
 -e POSTGRES_PASSWORD=secret \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_DB=video-manager \
 -v ${HOME}/postgres-data/:/var/lib/postgresql/data \
 -p 5432:5432 postgres
## 3. check that the container is running
docker ps

```

```sh
 docker compose up
```

```sh
Application is ready to receive connection @ http://localhost:8081
```

```sh
## API Documentation
https://documenter.getpostman.com/view/6225567/2s93JzLfn8
```

```sh
## API-ENDPOINTS

- V1
# USER

`- POST /api/v1/users Create user account`

`- POST /api/v1/users/login Login a user`

# Transfer

`- POST /api/v1/transfers` Create a transfer
# Account

`- POST /api/v1/accounts` Create an account`

`- GET /api/v1/accounts/:account` Get an account`

`- PATCH /api/v1/accounts` Add money

# Entity

`- GET /api/v1/entities` Get all Entities/Transaction history`
```
