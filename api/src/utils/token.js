const jwt = require('jsonwebtoken');

exports.generateToken = (user, always) =>
  jwt.sign(user, process.env.JWT_TOKEN_SECRET, !always && { expiresIn: '3h' });
