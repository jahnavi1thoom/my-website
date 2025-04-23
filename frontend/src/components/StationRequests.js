// frontend/src/components/StationRequests.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stationId = localStorage.getItem('stationId');
    if (!stationId) {
      navigate('/station/register');
      return;
    }

    fetchRequests(stationId);
  }, [navigate]);

  const fetchRequests = async (stationId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/station/${stationId}`);
      const data = await response.json();

      if (response.ok) {
        setRequests(data.orders);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Fuel Requests</h1>
      
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests yet</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {requests.map((request) => (
              <li key={request._id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Order #{request._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Fuel Type: {request.fuelType}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {request.quantity} L
                    </p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StationRequests;