import app from './app';
import { connectMongoDBDatabase, connectPostgresDatabase } from './config/database';
import logger from './config/logger';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // await connectMongoDBDatabase();
    await connectPostgresDatabase();
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    logger.error(`Error starting server: ${errorMessage}`);
    process.exit(1);
  }
};

startServer();