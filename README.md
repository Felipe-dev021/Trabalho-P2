# Hybrid Vehicles API

Backend REST completo em **Node.js + Express**, criado como base para uma prova de frontend.  
A API combina **PostgreSQL** e **MongoDB**, roda via **Docker**, possui autenticacao **JWT**, documentacao com **Swagger** e testes de integracao com **Jest + Supertest**.

## Visao Geral

| Area | Tecnologia |
| --- | --- |
| Runtime | Node.js |
| Framework HTTP | Express |
| Banco relacional | PostgreSQL + Sequelize |
| Banco NoSQL | MongoDB + Mongoose |
| Autenticacao | JWT + bcrypt |
| Seguranca | Helmet, CORS, express-rate-limit |
| Documentacao | Swagger UI |
| Testes | Jest + Supertest |
| Infraestrutura | Docker + Docker Compose |

## Arquitetura

O projeto segue uma organizacao inspirada em **MVC**:

```text
src/
  app.js                  # Configuracao do Express, middlewares e Swagger
  server.js               # Entry point da aplicacao
  config/
    database.js           # Conexao com PostgreSQL e MongoDB
  controllers/            # Regras HTTP de autenticacao e CRUDs
  middlewares/            # Middleware de autenticacao JWT
  models/                 # Models Sequelize e schemas Mongoose
  routes/
    index.js              # Agrupamento das rotas da API
tests/
  integration/
    api.test.js           # Testes reais com Jest e Supertest
```

## Banco de Dados Hibrido

A API usa dois bancos para demonstrar persistencia relacional e documental no mesmo backend:

- **Usuarios** ficam no **PostgreSQL**, usando Sequelize.
- **Carros**, **motos** e **marcas de roupa** ficam no **MongoDB**, usando Mongoose.

Essa escolha permite testar, em uma unica API, CRUD SQL e CRUD NoSQL com modelos e conexoes independentes.

## Seguranca

A API implementa recursos alinhados a boas praticas da OWASP:

- Senhas com hash usando `bcrypt`.
- Login com retorno de token `JWT`.
- Rotas de criacao, edicao e exclusao de carros, motos e marcas protegidas por JWT.
- Headers HTTP reforcados com `helmet`.
- Protecao basica contra abuso e brute force com `express-rate-limit`.
- `cors` liberado para qualquer origem, facilitando consumo por React, Vue ou outro frontend local.

## Como Rodar

A aplicacao foi desenhada para rodar via Docker.

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

## Variaveis de Ambiente

O arquivo `.env` ja esta pronto para uso com Docker, conforme solicitado no enunciado.  
O `.env.example` contem as mesmas chaves para facilitar recriacao do ambiente.

Principais variaveis:

```env
PORT=3000
DATABASE_URL=postgres://hybrid_user:hybrid_password@postgres:5432/hybrid_api
MONGO_URI=mongodb://mongo_user:mongo_password@mongo:27017/hybrid_api?authSource=admin
JWT_SECRET=super_secret_jwt_key_change_in_production
```

## Endpoints Principais

| Metodo | Rota | Descricao | Auth |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Cadastra usuario e retorna token | Nao |
| POST | `/api/auth/login` | Autentica usuario e retorna token | Nao |
| GET | `/api/users` | Lista usuarios | Nao |
| GET | `/api/users/:id` | Busca usuario por ID | Nao |
| PUT | `/api/users/:id` | Atualiza usuario | Nao |
| DELETE | `/api/users/:id` | Remove usuario | Nao |
| GET | `/api/cars` | Lista carros | Nao |
| POST | `/api/cars` | Cria carro | Sim |
| PUT | `/api/cars/:id` | Atualiza carro | Sim |
| DELETE | `/api/cars/:id` | Remove carro | Sim |
| GET | `/api/motos` | Lista motos | Nao |
| POST | `/api/motos` | Cria moto | Sim |
| PUT | `/api/motos/:id` | Atualiza moto | Sim |
| DELETE | `/api/motos/:id` | Remove moto | Sim |
| GET | `/api/brands` | Lista marcas de roupa | Nao |
| POST | `/api/brands` | Cria marca de roupa | Sim |
| PUT | `/api/brands/:id` | Atualiza marca de roupa | Sim |
| DELETE | `/api/brands/:id` | Remove marca de roupa | Sim |

Para rotas protegidas, envie:

```http
Authorization: Bearer <token>
```

## Testes

Execute a suite de integracao com:

```bash
docker compose run --rm test
```

Esse servico usa bancos Docker proprios para teste:

- `postgres_test`
- `mongo_test`

O comando abaixo tambem funciona:

```bash
docker compose run --rm api npm test
```

## Scripts

| Comando | Descricao |
| --- | --- |
| `npm start` | Inicia a API em modo producao dentro do container |
| `npm run dev` | Inicia a API com nodemon dentro do container |
| `npm test` | Executa testes de integracao dentro do container |

## Publicacao no GitHub

O arquivo `.env` foi mantido no projeto porque o enunciado pede um `.env` completo com URLs e senhas prontas para Docker.  
Essas credenciais sao apenas para ambiente local de prova e nao devem ser usadas em producao.

Antes de publicar, confirme que `node_modules` nao sera enviado:

```bash
git status
```

Depois, publique normalmente:

```bash
git add .
git commit -m "Initial backend API"
git push
```
