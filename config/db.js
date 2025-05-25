 const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/authSystem');
    logger.log('MongoDB connected successfully');

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error: ' + err.message);
    });

    mongoose.connection.on('disconnected', () => {
      logger.log('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
  } catch (err) {
    logger.error('Database initial connection error: ' + err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
