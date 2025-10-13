// src/controllers/authController.js
const authService = require('../services/authService');

// Handles POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'tourist' } = req.body; 

    // 1. Validate input (email, password strength) [cite: 43] 
    // This should ideally use express-validator [cite: 80] here.

    const user = await authService.registerUser(name, email, password, role);

    // Registration successful, token issued, refresh token handled by service [cite: 47]
    res.status(201).json({ 
      message: 'User registered successfully. Check email for verification (optional).',
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });

  } catch (error) {
    if (error.message.includes('E_DUPLICATE_EMAIL')) {
        return res.status(409).json({ error: 'Email already registered.' });
    }
    next(error);
  }
};

// Handles POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // 1. Verify credentials and issue tokens [cite: 47]
    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

    // 2. Refresh token usually set as HttpOnly cookie [cite: 50]
    res.cookie('refreshToken', refreshToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days [cite: 50]
    });

    res.status(200).json({ 
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      accessToken: accessToken // Short expiry token [cite: 49]
    });
  } catch (error) {
    if (error.message.includes('Invalid credentials')) {
        return res.status(401).json({ error: error.message });
    }
    next(error);
  }
};

// ... exports for refreshToken and logout ...