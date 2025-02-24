const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;