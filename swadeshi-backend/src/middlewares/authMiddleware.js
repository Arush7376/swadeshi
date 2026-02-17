// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication required: No token provided' });
  }

  // Token is typically in the format "Bearer <token>"
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key [cite: 132]
    const payload = jwt.verify(token, JWT_SECRET);
    
    // Attach the user payload to the request for use in controllers [cite: 130]
    req.user = payload; 
    
    // Proceed to the next middleware or controller [cite: 131]
    next();
  } catch (err) {
    // Handle expired or invalid token [cite: 135]
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
