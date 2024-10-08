import mongoose from 'mongoose';
import { config } from './index.js';
import pino from 'pino';

const logger = pino();

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.dbUri);
    logger.info('Database connected');
  } catch (err) {
    logger.error('Database connection error:', err);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('Database disconnected');
  } catch (err) {
    logger.error('Database disconnection error:', err);
  }
};