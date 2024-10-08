import dotenv from "dotenv";

dotenv.config();

export const config = {
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017/exampledb',
  port: process.env.PORT || 3000,
};