// src/routes/index.js
const router = require('express').Router();
const authRoutes = require('./authRoutes');
const destinationRoutes = require('./destinationRoutes');
const productRoutes = require('./productRoutes');
const weatherRoutes = require('./weatherRoutes'); // Placeholder for safety/weather

// Group routes by concern/prefix
router.use('/auth', authRoutes); // POST /api/auth/register, /api/auth/login [cite: 54]
router.use('/destinations', destinationRoutes); // GET /api/destinations [cite: 55]
router.use('/products', productRoutes); // GET /api/products [cite: 57]
router.use('/weather', weatherRoutes); // GET /api/weather/:city [cite: 62]

// Add other routes: /users, /planner, /bookings, /payments (when implemented)

module.exports = router;