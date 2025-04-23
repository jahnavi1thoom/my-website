// backend/routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Send OTP
router.post('/send-otp', async (req, res) => {
    try {
        console.log('Received request:', req.body); // Debug log
        const { phoneNumber } = req.body;

        if (!phoneNumber || phoneNumber.length !== 10) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid 10-digit phone number'
            });
        }

        // For testing, using a fixed OTP
        const testOtp = '123456';

        // Find user or create new one
        let user = await User.findOne({ phoneNumber });
        
        if (!user) {
            user = new User({
                phoneNumber,
                otp: {
                    code: testOtp,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry
                }
            });
        } else {
            user.otp = {
                code: testOtp,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000)
            };
        }

        await user.save();
        console.log('User saved:', user); // Debug log

        res.json({
            success: true,
            message: 'OTP sent successfully',
            testOtp: testOtp // Only for testing
        });

    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending OTP',
            error: error.message
        });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    try {
        console.log('Verify OTP request:', req.body); // Debug log
        const { phoneNumber, otp } = req.body;

        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // For testing purposes
        if (otp === '123456') {
            user.isVerified = true;
            user.otp = {
                code: null,
                expiresAt: null
            };
            await user.save();

            res.json({
                success: true,
                message: 'OTP verified successfully',
                userId: user._id
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying OTP',
            error: error.message
        });
    }
});

module.exports = router;