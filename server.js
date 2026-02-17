const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.ROOT_PORT || 5000;
const frontendDir = path.join(__dirname, 'swadeshi_frontend');

const demoDestinations = [
  {
    id: 1,
    name: 'Rishikesh',
    region: 'North',
    description: 'Yoga, Ganga ghats, and adventure sports.'
  },
  {
    id: 2,
    name: 'Hampi',
    region: 'South',
    description: 'Ancient ruins and boulder landscapes.'
  },
  {
    id: 3,
    name: 'Puri',
    region: 'East',
    description: 'Temples and coastal cuisine.'
  }
];

const demoProducts = [
  { id: 1, title: 'Handloom Shawl', price: 899, vendor: 'Artisan Co.' },
  { id: 2, title: 'Terracotta Set', price: 499, vendor: 'ClayWorks' },
  { id: 3, title: 'Spice Box', price: 299, vendor: 'TasteLocal' }
];

const demoSafetyAlerts = [
  { id: 1, message: 'Heavy rainfall expected in northern regions. Plan routes early.' },
  { id: 2, message: 'Festival traffic advisory active in major city centers.' },
  { id: 3, message: 'Carry valid ID and emergency contacts while traveling.' }
];

app.use(cors());
app.use(express.json());
app.use(express.static(frontendDir));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Swadeshi Root Server' });
});

app.get('/api/destinations', (req, res) => {
  res.status(200).json(demoDestinations);
});

app.get('/api/products', (req, res) => {
  res.status(200).json(demoProducts);
});

app.get('/api/safety-alerts', (req, res) => {
  res.status(200).json(demoSafetyAlerts);
});

app.get('/api/data', (req, res) => {
  res.status(200).json({
    itinerary: [{ place: 'Jaipur', date: '2026-02-20', activity: 'City Palace Visit' }],
    bookings: [{ service: 'Hotel - Jaipur', status: 'Confirmed' }],
    cartItems: [{ item: 'Handicraft Bag', price: 1200 }],
    savedDestinations: ['Goa Beach', 'Kerala Backwaters']
  });
});

app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      city,
      temp_k: 299,
      description: 'Demo weather (set OPENWEATHER_API_KEY for live data).'
    });
  }

  try {
    const weather = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: city, appid: apiKey, units: 'metric' },
      timeout: 5000
    });

    res.status(200).json({
      city,
      temp_k: weather.data.main.temp,
      description: weather.data.weather?.[0]?.description || 'N/A'
    });
  } catch (error) {
    res.status(200).json({
      city,
      temp_k: 299,
      description: 'Weather unavailable, showing demo data.'
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Swadeshi server running on port ${PORT}`);
});
