// frontend/src/components/Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 m-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Quick Fuel
          </h1>
          <p className="text-gray-600 mb-8">Your Instant Fuel Delivery Solution</p>
        </div>

        <button
          onClick={() => navigate('/selection')}
          className="w-full bg-blue-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;