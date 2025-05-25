 exports.validateSignUp = (req, res, next) => {
  // Example basic validation
  const { name, email, password, confirm_password } = req.body;
  if (!name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  next();
};

exports.validateSignIn = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  next();
};
