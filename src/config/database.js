require('dotenv').config();

const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');

const databaseUrl =
  process.env.NODE_ENV === 'test' && process.env.TEST_DATABASE_URL
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const mongoUri =
  process.env.NODE_ENV === 'test' && process.env.TEST_MONGO_URI
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'test' ? false : console.log,
  define: {
    timestamps: true,
    underscored: true
  }
});

async function retryConnection(label, operation, retries = 10, delayMs = 3000) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.error(`${label} connection attempt ${attempt}/${retries} failed: ${error.message}`);

      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}

async function connectPostgres() {
  await retryConnection('PostgreSQL', async () => {
    await sequelize.authenticate();
    await sequelize.sync();
  });

  console.log('PostgreSQL connected successfully.');
}

async function connectMongo() {
  mongoose.set('strictQuery', true);

  await retryConnection('MongoDB', async () => {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000
    });
  });

  console.log('MongoDB connected successfully.');
}

async function connectDatabases() {
  await connectPostgres();
  await connectMongo();
}

async function closeDatabases() {
  await sequelize.close();
  await mongoose.connection.close();
}

module.exports = {
  sequelize,
  mongoose,
  connectPostgres,
  connectMongo,
  connectDatabases,
  closeDatabases
};
