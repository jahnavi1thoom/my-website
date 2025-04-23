// frontend/src/components/UserLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        if (phoneNumber.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/users/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber })
            });

            const data = await response.json();

            if (response.ok) {
                setShowOtpInput(true);
                setError('Use OTP: 123456'); // For testing purposes
            } else {
                setError(data.message || 'Failed to send OTP');
            }
        } catch (error) {
          console.error('error:',error);
            setError('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/users/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, otp })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('phoneNumber', phoneNumber);
                navigate('/map-view');
            } else {
                setError(data.message || 'Invalid OTP');
            }
        } catch (error) {
            setError('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 m-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">User Login</h2>
                    <p className="text-gray-600 mt-2">Enter your phone number to continue</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                            maxLength={10}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your phone number"
                            disabled={showOtpInput || loading}
                        />
                    </div>

                    {!showOtpInput ? (
                        <button
                            onClick={handleSendOtp}
                            disabled={loading || phoneNumber.length !== 10}
                            className={`w-full py-3 rounded-lg text-white font-semibold
                                ${loading || phoneNumber.length !== 10 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-blue-500 hover:bg-blue-600'}`}
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    maxLength={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter 6-digit OTP"
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={loading || otp.length !== 6}
                                    className={`w-full py-3 rounded-lg text-white font-semibold
                                        ${loading || otp.length !== 6
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600'}`}
                                >
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                </button>

                                <button
                                    onClick={() => {
                                        setShowOtpInput(false);
                                        setOtp('');
                                        setError('');
                                    }}
                                    disabled={loading}
                                    className="w-full py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200"
                                >
                                    Change Phone Number
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className={`p-4 rounded-lg text-center ${
                            error.includes('Invalid') || error.includes('error')
                                ? 'bg-red-100 text-red-700'
                                : 'bg-blue-100 text-blue-700'
                        }`}>
                            {error}
                        </div>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/selection')}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        ← Back to Selection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;