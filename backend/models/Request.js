// backend/models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FuelStation',
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel'],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Request', requestSchema);