// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// Default OTP for testing
const DEFAULT_OTP = "123456";

// Validation middleware
const validatePhoneNumber = [
    body('phoneNumber')
        .matches(/^[0-9]{10}$/)
        .withMessage('Please enter a valid 10-digit phone number')
];

// Send OTP route
router.post('/send-otp', validatePhoneNumber, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { phoneNumber } = req.body;

        // Save default OTP to database
        await User.findOneAndUpdate(
            { phoneNumber },
            {
                phoneNumber,
                otp: {
                    code: DEFAULT_OTP,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
                }
            },
            { upsert: true }
        );

        res.json({
            success: true,
            message: 'OTP sent successfully',
            defaultOtp: DEFAULT_OTP // In production, remove this line
        });
    } catch (error) {
        console.error('Error in send-otp:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process OTP request'
        });
    }
});

// Verify OTP route
router.post('/verify-otp', [
    ...validatePhoneNumber,
    body('otp')
        .matches(/^[0-9]{6}$/)
        .withMessage('Please enter a valid 6-digit OTP')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { phoneNumber, otp } = req.body;
        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if OTP matches the default OTP
        if (otp !== DEFAULT_OTP) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        // Clear OTP after successful verification
        user.otp = undefined;
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            config.jwt.secret,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'OTP verified successfully',
            token,
            user: {
                _id: user._id,
                phoneNumber: user.phoneNumber
            }
        });
    } catch (error) {
        console.error('Error in verify-otp:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify OTP'
        });
    }
});

module.exports = router;