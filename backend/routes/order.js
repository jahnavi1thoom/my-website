// backend/routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create new order
router.post('/', async (req, res) => {
  try {
    const { userId, stationId, fuelType, quantity } = req.body;

    const newOrder = new Order({
      userId,
      stationId,
      fuelType,
      quantity,
      status: 'pending'
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
});

// Get orders by station
router.get('/station/:stationId', async (req, res) => {
  try {
    const orders = await Order.find({ stationId: req.params.stationId });
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

module.exports = router;