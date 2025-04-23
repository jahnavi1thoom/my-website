import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RequestStatus = () => {
  const [request, setRequest] = useState(null);
  const { requestId } = useParams();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get(`/api/requests/${requestId}`);
        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching request status:', error);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [requestId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600';
      case 'declined':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading request status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Request Status</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">Fuel Station:</p>
            <p className="font-medium">{request.stationId.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Fuel Type:</p>
            <p className="font-medium">{request.fuelType}</p>
          </div>
          <div>
            <p className="text-gray-600">Quantity:</p>
            <p className="font-medium">{request.quantity}L</p>
          </div>
          <div>
            <p className="text-gray-600">Total Price:</p>
            <p className="font-medium">₹{request.totalPrice}</p>
          </div>
          <div>
            <p className="text-gray-600">Status:</p>
            <p className={`font-medium ${getStatusColor(request.status)}`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestStatus;