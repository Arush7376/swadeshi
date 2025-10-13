// src/routes/destinationRoutes.js
const router = require('express').Router();
const destinationController = require('../controllers/destinationController');
const authMiddleware = require('../middlewares/authMiddleware');
// const rbacMiddleware = require('../middlewares/rbacMiddleware'); // For role-based control [cite: 52]

// GET /api/destinations - Get all destinations (Publicly accessible for frontend) [cite: 55]
router.get('/', destinationController.getAllDestinations);

// GET /api/destinations/:id - Get a single destination (Publicly accessible) [cite: 55]
router.get('/:id', destinationController.getDestinationById);

// POST /api/destinations - Create a new destination (Requires Business/Admin role) [cite: 55]
router.post('/', authMiddleware, destinationController.createDestination);
// Add rbacMiddleware('business') here later

module.exports = router;