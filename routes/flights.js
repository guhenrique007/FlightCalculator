const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightsController');

router.get('/:origin/:destination', flightController.getPrice );

module.exports = router;