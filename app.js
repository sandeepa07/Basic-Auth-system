 require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes'); // uncomment when ready

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use((req, res, next) => {
  logger.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/dashboard', dashboardRoutes);
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({
    success: false,
    message: 'Server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.log(`Server running on port ${PORT}`);
});
