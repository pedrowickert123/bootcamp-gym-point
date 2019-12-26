<h1 align="center">
<img src="https://raw.githubusercontent.com/davidfaria/gympoint-backend/master/.github/logo.png">
</h1>
<h3 align="center">
Back-end Node.js - GoStack Bootcamp <a href="https://rocketseat.com.br" target="__blank">Rocketseat</a>
</h3>

<p align = "center">
<img alt = "Última confirmação do Github" src="https://img.shields.io/github/last-commit/davidfaria/gympoint-backend">
<img alt = "Idioma principal do GitHub" src="https://img.shields.io/github/languages/top/davidfaria/gympoint-backend">
<img alt = "GitHub" src = "https://img.shields.io/github/license/davidfaria/gympoint-backend.svg">
</p>

## :gear: Back-end

## Requisitos

- Git [Git](https://git-scm.com)
- Node.js [Node.js v10.16](https://nodejs.org/)
- Yarn [Yarn v1.13](https://yarnpkg.com/)
- Postgres [PostgreSQL](https://www.postgresql.org/)
- Redis [Redis](https://redis.io/)
- MongoDB [MongoDB](https://www.mongodb.com/)
- Docker [Docker](https://www.docker.com/)
- Docker Compose [Docker Compose](https://docs.docker.com/compose/)

## Instruções

```bash
# clonando o repositório
git clone https://github.com/davidfaria/gympoint-backend.git

# entrabdo na pasta do projeto
cd bootcamp-nodejs-gym-point

# instalando as dependências
yarn install

# criando .env para informar as SUAS variáveis de ambiente
cp .env.example .env

# iniciando serviços (postgres, redis e mongodb)
# foi utilizado docker para subir estes serviços
docker-compose up -d

# criando estrutura do banco de dados
yarn sequelize db:migrate

# inserindo alguns dados iniciais
yarn sequelize db:seed:all

# iniciando o servidor da aplicação
yarn dev

# iniciando filas de jobs  (rodar ao mesmo tempo que o servidor, ou seja, em outro terminal)
yarn queue

```
