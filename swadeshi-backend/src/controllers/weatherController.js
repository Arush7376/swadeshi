// src/controllers/weatherController.js
const weatherService = require('../services/weatherService');

exports.getWeatherByCity = async (req, res, next) => {
  const city = req.params.city || req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required.' });
  }

  try {
    // Service handles caching and API call 
    const weatherData = await weatherService.getWeather(city);
    
    // Structure the data to be clean for the frontend
    res.status(200).json({
      city: city,
      temp_k: weatherData.main.temp, 
      description: weatherData.weather[0].description,
      // ... include other necessary fields
    });
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(503).json({ error: 'Could not fetch weather data at this time.' });
  }
};