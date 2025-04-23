const jwt = require('jsonwebtoken');
const config = require('../config/config');
const FuelStation = require('../models/FuelStation');

const stationAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, config.jwt.secret);
        
        // Check if stationId exists in token
        if (!decoded.stationId) {
            throw new Error();
        }

        const station = await FuelStation.findOne({
            _id: decoded.stationId,
            isActive: true
        });

        if (!station) {
            throw new Error();
        }

        req.station = station;
        req.stationId = station._id;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Please authenticate as a fuel station'
        });
    }
};

module.exports = stationAuth;