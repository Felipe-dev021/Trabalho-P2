# API Híbrida de Veículos e Marcas

Backend REST completo em **Node.js + Express**, criado como base para uma prova de frontend.
A API combina **PostgreSQL** e **MongoDB**, roda via **Docker**, possui autenticação **JWT**, documentação com **Swagger** e testes de integração com **Jest + Supertest**.

## Visão Geral

| Área | Tecnologia |
| --- | --- |
| Ambiente de execução | Node.js |
| Framework HTTP | Express |
| Banco relacional | PostgreSQL + Sequelize |
| Banco NoSQL | MongoDB + Mongoose |
| Autenticação | JWT + bcrypt |
| Segurança | Helmet, CORS, express-rate-limit |
| Documentação | Swagger UI |
| Testes | Jest + Supertest |
| Infraestrutura | Docker + Docker Compose |

## Arquitetura

O projeto segue uma organização inspirada em **MVC**, separando configuração, rotas, controllers, models e middlewares.

```text
src/
  app.js                  # Configuração do Express, middlewares e Swagger
  server.js               # Ponto de entrada da aplicação
  config/
    database.js           # Conexão com PostgreSQL e MongoDB
  controllers/            # Regras HTTP de autenticação e CRUDs
  middlewares/            # Middleware de autenticação JWT
  models/                 # Models Sequelize e schemas Mongoose
  routes/
    index.js              # Agrupamento das rotas da API
tests/
  integration/
    api.test.js           # Testes reais com Jest e Supertest
```

## Banco de Dados Híbrido

A API usa dois bancos para demonstrar persistência relacional e documental no mesmo backend:

- **Usuários** ficam no **PostgreSQL**, usando Sequelize.
- **Carros**, **motos** e **marcas de roupa** ficam no **MongoDB**, usando Mongoose.

Essa escolha permite testar, em uma única API, CRUD SQL e CRUD NoSQL com modelos e conexões independentes.

## Segurança

A API implementa recursos alinhados a boas práticas da OWASP:

- Senhas com hash usando `bcrypt`.
- Login com retorno de token `JWT`.
- Rotas de criação, edição e exclusão de carros, motos e marcas protegidas por JWT.
- Headers HTTP reforçados com `helmet`.
- Proteção básica contra abuso e brute force com `express-rate-limit`.
- `cors` liberado para qualquer origem, facilitando consumo por React, Vue ou outro frontend local.

## Como Rodar

A aplicação foi desenhada para rodar via Docker.

```bash
docker compose up --build
```

Depois de subir os containers:

| Recurso | URL |
| --- | --- |
| API | `http://localhost:3000` |
| Healthcheck | `http://localhost:3000/health` |
| Swagger | `http://localhost:3000/api-docs` |
| PostgreSQL | `localhost:5432` |
| MongoDB | `localhost:27017` |

## Variáveis de Ambiente

O arquivo `.env` já está pronto para uso com Docker, conforme solicitado no enunciado.
O `.env.example` contém as mesmas chaves para facilitar a recriação do ambiente.

Principais variáveis:

```env
PORT=3000
DATABASE_URL=postgres://hybrid_user:hybrid_password@postgres:5432/hybrid_api
MONGO_URI=mongodb://mongo_user:mongo_password@mongo:27017/hybrid_api?authSource=admin
JWT_SECRET=super_secret_jwt_key_change_in_production
```

## Endpoints Principais

| Método | Rota | Descrição | Autenticação |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Cadastra usuário e retorna token | Não |
| POST | `/api/auth/login` | Autentica usuário e retorna token | Não |
| GET | `/api/users` | Lista usuários | Não |
| GET | `/api/users/:id` | Busca usuário por ID | Não |
| PUT | `/api/users/:id` | Atualiza usuário | Não |
| DELETE | `/api/users/:id` | Remove usuário | Não |
| GET | `/api/cars` | Lista carros | Não |
| POST | `/api/cars` | Cria carro | Sim |
| PUT | `/api/cars/:id` | Atualiza carro | Sim |
| DELETE | `/api/cars/:id` | Remove carro | Sim |
| GET | `/api/motos` | Lista motos | Não |
| POST | `/api/motos` | Cria moto | Sim |
| PUT | `/api/motos/:id` | Atualiza moto | Sim |
| DELETE | `/api/motos/:id` | Remove moto | Sim |
| GET | `/api/brands` | Lista marcas de roupa | Não |
| POST | `/api/brands` | Cria marca de roupa | Sim |
| PUT | `/api/brands/:id` | Atualiza marca de roupa | Sim |
| DELETE | `/api/brands/:id` | Remove marca de roupa | Sim |

Para rotas protegidas, envie:

```http
Authorization: Bearer <token>
```

## Testes

Execute a suíte de integração com:

```bash
docker compose run --rm test
```

Esse serviço usa bancos Docker próprios para teste:

- `postgres_test`
- `mongo_test`

O comando abaixo também funciona:

```bash
docker compose run --rm api npm test
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia a API em modo produção dentro do container |
| `npm run dev` | Inicia a API com nodemon dentro do container |
| `npm test` | Executa testes de integração dentro do container |
