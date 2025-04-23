// backend/models/FuelStation.js
const mongoose = require('mongoose');

const fuelStationSchema = new mongoose.Schema({
  stationName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  stationNumber: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FuelStation', fuelStationSchema);