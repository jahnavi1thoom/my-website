// src/components/FuelRequest.js
import React, { useState } from 'react';

const FuelRequest = () => {
    const [formData, setFormData] = useState({
        stationName: '',
        username: '',
        fuelType: 'Diesel',
        quantity: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    const inputStyle = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 text-lg";
    const labelStyle = "block text-gray-700 text-lg font-medium mb-2";

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className={labelStyle}>
                            Enter the name of fuel station:
                        </label>
                        <input
                            type="text"
                            className={inputStyle}
                            value={formData.stationName}
                            onChange={(e) => setFormData({...formData, stationName: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>
                            Username:
                        </label>
                        <input
                            type="text"
                            className={inputStyle}
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>
                            Type of Fuel:
                        </label>
                        <select
                            className={inputStyle}
                            value={formData.fuelType}
                            onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                        >
                            <option value="Diesel">Diesel</option>
                            <option value="Petrol">Petrol</option>
                        </select>
                    </div>

                    <div>
                        <label className={labelStyle}>
                            Quantity (in liters):
                        </label>
                        <input
                            type="number"
                            min="1"
                            className={inputStyle}
                            value={formData.quantity}
                            onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>
                            Total Price (₹):
                        </label>
                        <div className={`${inputStyle} bg-gray-100`}>
                            {formData.quantity * (formData.fuelType === 'Diesel' ? 89.62 : 96.72)}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-all shadow-lg mt-8"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FuelRequest;