import 'reflect-metadata';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import logger from './logger';

dotenv.config();

/**
 * 🔹 Conectar ao MongoDB
 */
export const connectMongoDBDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/default_database';
  try {
    await mongoose.connect(mongoUri);
    logger.info(`✅ Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    logger.error(`❌ Error connecting to MongoDB: ${(error as Error).message}`);
    process.exit(1);
  }
};

/**
 * 🔹 Configuração do PostgreSQL com TypeORM
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'mydatabase',
  entities: [__dirname + '/../entities/*.{ts,js}'],
  synchronize: process.env.NODE_ENV === 'development',
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  logging: false,
});

/**
 * 🔹 Conectar ao PostgreSQL com TypeORM
 */
export const connectPostgresDatabase = async () => {
  try {
    await AppDataSource.initialize();
    logger.info(`✅ Connected to PostgreSQL at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  } catch (error) {
    logger.error(`❌ Error connecting to PostgreSQL: ${(error as Error).message}`);
    process.exit(1);
  }
};