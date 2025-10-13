// src/routes/weatherRoutes.js
const router = require('express').Router();
const weatherController = require('../controllers/weatherController');

// GET /api/weather/:city or /api/weather?city= [cite: 62]
router.get('/:city', weatherController.getWeatherByCity);

module.exports = router;