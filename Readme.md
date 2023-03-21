<p align="center">
  <a href="https://www.freecodecamp.org/news/content/images/2020/03/PERN.png"><img src="https://www.freecodecamp.org/news/content/images/2020/03/PERN.png" alt="PERN-blogs" height="200"></a>
</p>

<p align="center">
    <em>FullStack PERN Blogs Application using Tailwind & Docker</em>
</p>

---

**Source Code**:

https://gitlab.com/Poojan670/pern-blogs

---

React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.

Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more. Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript Engine, and executes JavaScript code outside a web browser.

Tailwind CSS is an open source CSS framework. The main feature of this library is that, unlike other CSS frameworks like Bootstrap, it does not provide a series of predefined classes for elements such as buttons or tables.

Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.

<p align="center">
  <a href="https://www.pulumi.com/blog/deploying-a-pern-stack-application-to-aws/meta.png"><img src="https://www.pulumi.com/blog/deploying-a-pern-stack-application-to-aws/meta.png" alt="React" height="200"></a>
</p>

## Project Description

_FullStack Blogs Web Application Using React as Frontend, Node as backend_

_Postgres is used as the main database for this application_

_Fully Dockerized and Configured on Local & Production_

## Requirements

React 17+

npx/yarn/node/nvm

PostgreSQL

NodeJs 14.8.0 or less

Docker

Kubernetes using Docker or Minikube

## Helpful References and forks

_PERN Stack Blogs, Sequelize stack for migrations and SQL related queries_

## Installation

<div class="termy">

**_Application Setup_**

# Server Setup

_setup .env inside server_

```console
PORT=5000
NODE_ENV='development'
DEV_DATABASE_URL='postgres://postgres:poojan12@localhost:5432/pern_blog'
TEST_DATABASE_URL='postgres://postgres:poojan12@localhost:5432/pern_blog'
DATABASE_URL='postgres://postgres:poojan12@localhost:5432/pern_blog'
SECRET_KEY='aoidsfjoin2oi1h38s12jvapoojanhanteyspo19idkjan'
TOKEN_SECRET='asdfhasho1239nasdjf1`23'
EMAIL_USERNAME='poojanbckup1@gmail.com'
EMAIL_PASSWORD='xzbuxpdinyvgsztz'
jwtPrivateKey='asdfnasjdnfjbxvb1oj2312j9asdfn123asdf'
DEFAULT_ADMIN_EMAIL='admin'
DEFAULT_ADMIN_USERNAME='admin'
# DEFAULT_ADMIN_PASSWORD='$2b$10$S9hAqCspMSbwk9ZgoR1bU.AZeX8pyTXVZm9oBLSFMbnLzhMLluGhO'
DEFAULT_ADMIN_PASSWORD='Admin1@'
CORS_ALLOWED_ORIGINS='http://localhost:3000','http://localhost:3001'
```

**Create database in postgres**
open psql terminal

```console
$ create database pern_blogs
```

_or create a database manually using PgAdmin4(comes along with postgres installation)_

_start NodeJS server_

```console
(if yarn is not installed, npm i -g yarn)

$ yarn
$ yarn start (starts the server on port 5000)
```

# Client Setup

```console
$ yarn
$ yarn start:development (starts the development server)
```

And Bingo, you're good to go.

Navigate to http://localhost:3000 to access client &

http://localhost:5000 to access server

# Setup Client & Server with Docker

Using Makefile

```console
$ make build
$ make run
$ make run-background
```

Using docker

```console
$ cd server && docker build -t blogs-client . && docker run -p 3000:3000 blogs-client
$ cd client && docker build -t blogs-server . && docker run -p 5000:5000 blogs-server
```

Using docker compose on local environment

```console
$ docker compose -f docker-compose.local up
```

Using docker compose on prod environment

```console
$ docker compose -f docker-compose.prod up
```

Using docker compose on host network environment

```console
$ docker compose -f prod-host up
```
