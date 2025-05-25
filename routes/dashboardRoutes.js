const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  // You can serve a static dashboard.html or send a simple message
  res.sendFile('dashboard.html', { root: './public' }); // adjust path if needed
  // Or:
  // res.send('Welcome to Dashboard!');
});

module.exports = router;
