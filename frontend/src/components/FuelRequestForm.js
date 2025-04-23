// frontend/src/components/FuelRequestForm.js
import React, { useState } from 'react';
import axios from 'axios';

const FuelRequestForm = ({ station, onClose }) => {
    const [formData, setFormData] = useState({
        fuelType: 'Petrol',
        quantity: 1
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const fuelPrices = {
        Petrol: 102.61,
        Diesel: 97.52
    };

    const totalPrice = (fuelPrices[formData.fuelType] * formData.quantity).toFixed(2);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Randomly decide if request is accepted or rejected
            const isAccepted = Math.random() > 0.5;
            
            if (isAccepted) {
                showNotification(`Your fuel request has been accepted by ${station.name}!`, 'success');
            } else {
                showNotification(`Your fuel request was declined by ${station.name}`, 'error');
            }

            setTimeout(() => {
                onClose();
            }, 3000);

        } catch (error) {
            showNotification('Failed to submit request. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (text, type) => {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white max-w-md`;
        notification.textContent = text;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6">Fuel Request - {station.name}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Station Details
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium">{station.name}</p>
                            <p className="text-sm text-gray-600">{station.address}</p>
                            <p className="text-sm text-gray-500">Station No: {station.stationNumber}</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type of Fuel
                        </label>
                        <select
                            value={formData.fuelType}
                            onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity (in liters)
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={formData.quantity}
                            onChange={(e) => setFormData({...formData, quantity: Math.max(1, parseInt(e.target.value) || 0)})}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total Price
                        </label>
                        <div className="bg-gray-50 px-4 py-2 rounded-lg font-medium">
                            ₹{totalPrice}
                        </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 py-3 rounded-lg text-white font-semibold ${
                                loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {loading ? 'Processing...' : 'Submit Request'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FuelRequestForm;