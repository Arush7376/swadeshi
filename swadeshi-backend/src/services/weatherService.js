// src/services/weatherService.js
const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const CACHE = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes 

// Fetch weather data, checking cache first
exports.getWeather = async (city) => {
  const cacheKey = city.toLowerCase();
  const cachedData = CACHE.get(cacheKey);

  // Check cache expiry
  if (cachedData && Date.now() < cachedData.expires) {
    console.log(`[Cache Hit] Weather for ${city}`);
    return cachedData.data;
  }

  console.log(`[Cache Miss] Fetching weather for ${city}`);
  
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Change to 'kelvin' if needed, frontend expects temp_k for demo
      }
    });

    const data = response.data;

    // Store new data in cache 
    CACHE.set(cacheKey, {
      data: data,
      expires: Date.now() + CACHE_TTL
    });

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch weather data for ${city}: ${error.message}`);
  }
};