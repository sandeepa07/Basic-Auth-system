const express = require('express');
const { signup, signin } = require('../controllers/authController');
const { validateSignUp, validateSignIn } = require('../middleware/validation');

const router = express.Router();

router.post('/signup', validateSignUp, signup);
router.post('/signin', validateSignIn, signin);

module.exports = router;