const validator = require('validator');
const logger = require('../utils/logger');

const validateSignUp = (req, res, next) => {
  const { name, email, mobile_number, gender, password, confirm_password } = req.body;
  
  // Check all fields are present
  if (!name || !email || !mobile_number || !gender || !password || !confirm_password) {
    logger.error('Missing required fields during signup');
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }
  
  // Validate email
  if (!validator.isEmail(email)) {
    logger.error(`Invalid email format: ${email}`);
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email'
    });
  }
  
  // Validate password strength
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    logger.error('Weak password provided during signup');
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    });
  }
  
  // Validate password match
  if (password !== confirm_password) {
    logger.error('Password mismatch during signup');
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    });
  }
  
  next();
};

const validateSignIn = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    logger.error('Missing email or password during signin');
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }
  
  next();
};

module.exports = { validateSignUp, validateSignIn };