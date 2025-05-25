const logger = require('../utils/logger');

exports.getDashboard = async (req, res) => {
  try {
    logger.log(`Dashboard accessed by user: ${req.user.email}`);
    res.status(200).json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (err) {
    logger.error(`Dashboard error: ${err.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};