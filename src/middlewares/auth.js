const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'JWT token is missing.' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (!/^Bearer$/i.test(scheme) || !token) {
      return res.status(401).json({ error: 'JWT token is malformed.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found for this token.' });
    }

    req.userId = user.id;
    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired JWT token.' });
  }
}

module.exports = auth;
