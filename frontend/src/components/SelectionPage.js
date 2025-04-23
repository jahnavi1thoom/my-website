// frontend/src/components/SelectionPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectionPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 m-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Choose Your Role</h2>
                    <p className="text-gray-600 mt-2">Select how you want to use Quick Fuel</p>
                </div>

                <div className="space-y-6">
                    <button
                        onClick={() => navigate('/user-login')}
                        className="w-full bg-blue-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all"
                    >
                        User Login
                    </button>

                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button
                        onClick={() => navigate('/station-register')}
                        className="w-full bg-white border-2 border-blue-500 text-blue-500 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all"
                    >
                        Register Fuel Station
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectionPage;