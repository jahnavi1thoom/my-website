// frontend/src/components/StationDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StationDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const stationId = localStorage.getItem('stationId');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/stations/${stationId}/orders`);
            setOrders(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch orders');
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/requests/${orderId}/status`, {
                status: newStatus
            });
            fetchOrders(); // Refresh orders after update
        } catch (err) {
            console.error('Failed to update order status:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Order History</h2>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4">Loading orders...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                        {error}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No orders received yet
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div 
                                key={order._id}
                                className="bg-white rounded-lg shadow-sm p-6"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Order #{order._id.slice(-6)}
                                        </h3>
                                        <p className="text-gray-600">
                                            Customer: {order.userId}
                                        </p>
                                        <div className="mt-2">
                                            <p>Fuel Type: {order.fuelType}</p>
                                            <p>Quantity: {order.quantity} liters</p>
                                            <p>Total Price: ₹{order.totalPrice}</p>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Ordered on: {new Date(order.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                            order.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                        {order.status === 'pending' && (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(order._id, 'accepted')}
                                                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(order._id, 'rejected')}
                                                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StationDashboard;