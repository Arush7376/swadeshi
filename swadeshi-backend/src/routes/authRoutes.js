// src/routes/authRoutes.js
const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); 

// Registration flow [cite: 42]
router.post('/register', authController.register); 

// Login flow [cite: 46]
router.post('/login', authController.login);

// Token management [cite: 48]
router.post('/refresh', authController.refreshToken);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;