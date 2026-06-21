const app = require('./app');
const { connectDatabases } = require('./config/database');

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await connectDatabases();

    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
