// backend/config/config.js
const dotenv = require('dotenv');
dotenv.config();

const config = {
    server: {
        port: process.env.PORT || 5000,
        nodeEnv: process.env.NODE_ENV || 'development'
    },
    database: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/quick-fuel'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    },
    otp: {
        expiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES) || 10,
        length: parseInt(process.env.OTP_LENGTH) || 6
    }
};

module.exports = config;