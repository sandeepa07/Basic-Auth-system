const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

exports.signup = async (req, res) => {
  try {
    const { name, email, mobile_number, gender, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.error(`Attempt to register with existing email: ${email}`);
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    const user = await User.create({
      name,
      email,
      mobile_number,
      gender,
      password
    });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
    
    logger.log( `New user registered: ${email}` );
    res.status(201).json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    logger.error( `Signup error: ${err.message}` );
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      logger.error( `Attempt to login with non-existent email: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const isMatch = await user.correctPassword(password, user.password);
    if (!isMatch) {
      logger.error( `Invalid password attempt for email: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
    
    logger.log( `User logged in: ${email}` );
    res.status(200).json({
      success: true,
      token,
      redirect: '/dashboard.html',
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    logger.error(`Signin error: ${err.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};
