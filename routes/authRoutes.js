 const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/authController');
const { validateSignUp, validateSignIn } = require('../middleware/validation');

// Signup and Signin routes
router.post('/signup', validateSignUp, signup);
router.post('/signin', validateSignIn, signin);

module.exports = router;
