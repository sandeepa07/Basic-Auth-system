const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/authSystem', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.log('MongoDB connected successfully');
  } catch (err) {
    logger.error('Database connection error: ' + err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
