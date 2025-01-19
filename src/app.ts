import express, { Application } from 'express';
import mongoose from 'mongoose';
import logger from './config/logger';
import routes from './routes';

const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;