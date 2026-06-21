# Gestão Híbrida - Backend

API REST para gestão de usuários, carros, motos e marcas de roupa. O backend foi preparado para rodar com Docker Compose, usando PostgreSQL, MongoDB, autenticação JWT e documentação Swagger.

## Visão Geral

| Recurso | Tecnologia |
| --- | --- |
| Servidor HTTP | Node.js + Express |
| Usuários | PostgreSQL + Sequelize |
| Carros, motos e marcas | MongoDB + Mongoose |
| Autenticação | JWT + bcrypt |
| Segurança | Helmet, CORS e rate limit |
| Documentação | Swagger UI |
| Testes | Jest + Supertest |
| Execução | Docker Compose |

## O Que a API Entrega

- Cadastro e login de usuários.
- Senhas armazenadas com hash.
- Token JWT para rotas protegidas.
- CRUD completo de usuários.
- CRUD completo de carros.
- CRUD completo de motos.
- CRUD completo de marcas de roupa.
- Documentação interativa no Swagger.
- Testes de integração reais.

## Como Rodar

Dentro da pasta do backend, execute:

```bash
docker compose down -v --remove-orphans
docker compose up --build --force-recreate
```

Depois acesse:

| Serviço | URL |
| --- | --- |
| API | `http://localhost:3000` |
| Healthcheck | `http://localhost:3000/health` |
| Swagger | `http://localhost:3000/api-docs` |
| PostgreSQL | `localhost:5432` |
| MongoDB | `localhost:27017` |

## Variáveis de Ambiente

O arquivo `.env` já acompanha valores prontos para Docker.

Principais variáveis:

```env
PORT=3000
DATABASE_URL=postgres://hybrid_user:hybrid_password@postgres:5432/hybrid_api
MONGO_URI=mongodb://mongo_user:mongo_password@mongo:27017/hybrid_api?authSource=admin
JWT_SECRET=super_secret_jwt_key_change_in_production
```

## Rotas Principais

| Método | Rota | Descrição | Protegida |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Cria usuário e retorna token | Não |
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
| GET | `/api/brands` | Lista marcas | Não |
| POST | `/api/brands` | Cria marca | Sim |
| PUT | `/api/brands/:id` | Atualiza marca | Sim |
| DELETE | `/api/brands/:id` | Remove marca | Sim |

Para rotas protegidas, envie:

```http
Authorization: Bearer <token>
```

## Testes

Execute a suíte de integração com:

```bash
docker compose --profile test run --rm test
```

Os testes usam bancos separados dentro do Docker, sem misturar dados com o ambiente principal.

## Integração com o Frontend

Quando o frontend estiver em outro repositório, suba este backend primeiro. Ele ficará disponível em:

```text
http://localhost:3000/api
```

No repositório do frontend, configure:

```env
VITE_API_URL=http://localhost:3000/api
```

Com isso, os dois projetos funcionam separados e continuam integrados pelo navegador.
