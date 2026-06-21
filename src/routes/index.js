const { Router } = require('express');
const auth = require('../middlewares/auth');

const AuthController = require('../controllers/AuthController');
const CarController = require('../controllers/CarController');
const MotoController = require('../controllers/MotoController');
const BrandController = require('../controllers/BrandController');

const routes = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registers a new user and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully.
 */
routes.post('/auth/register', AuthController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticates a user and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       200:
 *         description: Login successful.
 */
routes.post('/auth/login', AuthController.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lists all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users.
 */
routes.get('/users', AuthController.index);
routes.get('/users/:id', AuthController.show);
routes.put('/users/:id', AuthController.update);
routes.delete('/users/:id', AuthController.delete);

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Lists all cars.
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: List of cars.
 *   post:
 *     summary: Creates a car.
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Car created successfully.
 */
routes.get('/cars', CarController.index);
routes.get('/cars/:id', CarController.show);
routes.post('/cars', auth, CarController.store);
routes.put('/cars/:id', auth, CarController.update);
routes.delete('/cars/:id', auth, CarController.delete);

/**
 * @swagger
 * /api/motos:
 *   get:
 *     summary: Lists all motos.
 *     tags: [Motos]
 *     responses:
 *       200:
 *         description: List of motos.
 *   post:
 *     summary: Creates a moto.
 *     tags: [Motos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Moto created successfully.
 */
routes.get('/motos', MotoController.index);
routes.get('/motos/:id', MotoController.show);
routes.post('/motos', auth, MotoController.store);
routes.put('/motos/:id', auth, MotoController.update);
routes.delete('/motos/:id', auth, MotoController.delete);

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Lists all clothing brands.
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of clothing brands.
 *   post:
 *     summary: Creates a clothing brand.
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Brand created successfully.
 */
routes.get('/brands', BrandController.index);
routes.get('/brands/:id', BrandController.show);
routes.post('/brands', auth, BrandController.store);
routes.put('/brands/:id', auth, BrandController.update);
routes.delete('/brands/:id', auth, BrandController.delete);

module.exports = routes;
