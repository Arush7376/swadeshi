// src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Set to console.log in development
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import Models
db.User = require('../models/User')(sequelize, Sequelize);
db.Destination = require('../models/Destination')(sequelize, Sequelize);
db.Product = require('../models/Product')(sequelize, Sequelize);
// ... import other models (Business, Itinerary, Booking, Review)

// Setup Associations (defined in models/index.js in a real app)
if (db.User.associate) db.User.associate(db);
if (db.Destination.associate) db.Destination.associate(db);
if (db.Product.associate) db.Product.associate(db);

module.exports = db;