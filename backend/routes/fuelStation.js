// backend/routes/fuelStation.js
const express = require('express');
const router = express.Router();
const FuelStation = require('../models/FuelStation');

router.post('/register', async (req, res) => {
  try {
    const { stationName, address, email, password, stationNumber } = req.body;

    // Check if station already exists
    const existingStation = await FuelStation.findOne({ email });
    if (existingStation) {
      return res.status(400).json({
        success: false,
        message: 'Station with this email already exists'
      });
    }

    // Create new station
    const station = new FuelStation({
      stationName,
      address,
      email,
      password,
      stationNumber
    });

    await station.save();

    res.status(201).json({
      success: true,
      message: 'Station registered successfully',
      station: {
        id: station._id,
        stationName: station.stationName,
        email: station.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering station',
      error: error.message
    });
  }
});

module.exports = router;