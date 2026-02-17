// src/server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./config/database');
const allRoutes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.BACKEND_PORT || 5001;
const API_BASE_URL = process.env.API_BASE_URL || '/api';

// Database connection sync
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables synced!");
}).catch(err => {
  console.error("Failed to sync DB:", err);
});

// Security and Logging Middleware [cite: 116, 117, 118]
app.use(helmet());
app.use(cors()); // Configure allowed origins later [cite: 84]
app.use(morgan('dev'));
app.use(express.json()); // Body parser [cite: 119]

// Health Check Endpoint [cite: 97]
app.get('/health', (req, res) => res.status(200).send({ status: 'UP', service: 'Swadeshi API' }));

// Main Routes
app.use(API_BASE_URL, allRoutes);

// Central Error Handler Middleware [cite: 82]
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at ${API_BASE_URL}`);
});
