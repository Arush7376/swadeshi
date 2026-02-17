// src/controllers/destinationController.js
const { Destination } = require('../config/database'); // Import model
// const destinationService = require('../services/destinationService'); // For complex logic [cite: 24]

// Example Controller function
exports.getAllDestinations = async (req, res, next) => {
  try {
    // In a real app, you would add query params for search/filter/pagination
    const destinations = await Destination.findAll({
      attributes: ['id', 'title', 'region', 'description']
    }); 

    // Match the array format expected by your frontend DEMO_DESTS (name vs title)
    const formattedDestinations = destinations.map(d => ({
        id: d.id,
        name: d.title, 
        region: d.region,
        description: d.description
    }));

    res.status(200).json(formattedDestinations);
  } catch (error) {
    next(error); // Pass error to central error handler
  }
};

exports.createDestination = async (req, res, next) => {
  // Logic for POST /api/destinations
  try {
    const { title, description, region, coordinates } = req.body;
    // Add validation here [cite: 80]
    
    const newDestination = await Destination.create({
      title, description, region, coordinates, // and user_id from req.user
    });

    res.status(201).json(newDestination);
  } catch (error) {
    next(error);
  }
};

exports.getDestinationById = async (req, res, next) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found.' });
    }

    res.status(200).json({
      id: destination.id,
      name: destination.title,
      region: destination.region,
      description: destination.description
    });
  } catch (error) {
    next(error);
  }
};
