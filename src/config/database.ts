import mongoose from 'mongoose';
import logger from './logger';
import dotenv from 'dotenv';

dotenv.config();

const connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/default_database';
  try {
    await mongoose.connect(mongoUri);
    logger.info(`Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    const errorMessage = (error as Error).message;
    logger.error(`Error connecting to MongoDB: ${errorMessage}`);
    process.exit(1);
  }
};

export default connectDatabase;