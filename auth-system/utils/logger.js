const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
const logFile = path.join(logDir, 'auth-system.log');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = {
  log: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] LOG: ${message}\n`;
    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage);
  },
  error: (message) => {
    const timestamp = new Date().toISOString();
    const errorMessage = `[${timestamp}] ERROR: ${message}\n`;
    console.error(errorMessage);
    fs.appendFileSync(logFile, errorMessage);
  }
};

module.exports = logger;