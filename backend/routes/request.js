const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Create new request
router.post('/create', async (req, res) => {
    try {
        const { stationId, userId, fuelType, quantity, totalPrice } = req.body;

        const request = new Request({
            stationId,
            userId,
            fuelType,
            quantity,
            totalPrice,
            status: 'pending'
        });

        await request.save();

        // Simulate random acceptance/rejection after 15 seconds
        setTimeout(async () => {
            request.status = Math.random() > 0.5 ? 'accepted' : 'rejected';
            await request.save();
        }, 15000);

        res.status(201).json({
            message: 'Request created successfully',
            request
        });
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ message: 'Error creating request' });
    }
});

// Get request status
router.get('/:requestId/status', async (req, res) => {
    try {
        const request = await Request.findById(req.params.requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json({ status: request.status });
    } catch (error) {
        console.error('Error fetching request status:', error);
        res.status(500).json({ message: 'Error fetching request status' });
    }
});

module.exports = router;