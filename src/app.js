require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests, please try again later.'
  }
});

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hybrid Vehicles API',
      version: '1.0.0',
      description: 'API REST com Express, PostgreSQL, MongoDB, JWT e Docker.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Docker server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Maria Silva' },
            email: { type: 'string', example: 'maria@example.com' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        AuthRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'maria@example.com' },
            password: { type: 'string', example: '123456' }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Maria Silva' },
            email: { type: 'string', example: 'maria@example.com' },
            password: { type: 'string', example: '123456' }
          }
        },
        Car: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '665f1cbf1a624c9d5a3a7b1c' },
            brand: { type: 'string', example: 'Toyota' },
            model: { type: 'string', example: 'Corolla' },
            year: { type: 'integer', example: 2024 },
            color: { type: 'string', example: 'White' },
            price: { type: 'number', example: 145000 }
          }
        },
        Moto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '665f1cbf1a624c9d5a3a7b1d' },
            brand: { type: 'string', example: 'Honda' },
            model: { type: 'string', example: 'CB 500F' },
            year: { type: 'integer', example: 2024 },
            color: { type: 'string', example: 'Red' },
            price: { type: 'number', example: 42000 }
          }
        },
        Brand: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '665f1cbf1a624c9d5a3a7b1e' },
            name: { type: 'string', example: 'Reserva' },
            country: { type: 'string', example: 'Brazil' },
            category: { type: 'string', example: 'Casual' },
            foundedYear: { type: 'integer', example: 2004 }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
});

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] }));
app.use(helmet());
app.use(limiter);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'hybrid-vehicles-api'
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

try {
  const routes = require('./routes');
  app.use('/api', routes);
} catch (error) {
  if (error.code !== 'MODULE_NOT_FOUND') {
    throw error;
  }
}

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found.'
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    error: error.message || 'Internal server error.'
  });
});

module.exports = app;
