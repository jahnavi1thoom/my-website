// frontend/src/components/MapView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FuelRequestForm from './FuelRequestForm';

const MapView = () => {
    const [stations, setStations] = useState([
        {
            _id: '1',
            name: 'Test Fuel Station',
            address: '',
            stationNumber: '',
        },
        {
            _id: '2',
            name: 'HP Fuel Station',
            address: 'Gachibowli, Hyderabad',
            stationNumber: 'HP001',
        },
        {
            _id: '3',
            name: 'Indian Oil Station',
            address: 'Madhapur, Hyderabad',
            stationNumber: 'IOC001',
        },
        {
            _id: '4',
            name: 'Bharat Petroleum',
            address: 'Jubilee Hills, Hyderabad',
            stationNumber: 'BP001',
        },
        {
            _id: '5',
            name: 'Shell Station',
            address: 'HITEC City, Hyderabad',
            stationNumber: 'SH001',
        }
    ]);

    const [selectedStation, setSelectedStation] = useState(null);
    const [showRequestForm, setShowRequestForm] = useState(false);

    const handleRequestFuel = (station) => {
        setSelectedStation(station);
        setShowRequestForm(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Available Stations</h2>
                
                <div className="space-y-4">
                    {stations.map((station) => (
                        <div 
                            key={station._id}
                            className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {station.name}
                                </h3>
                                {station.address && (
                                    <p className="text-gray-600 mt-1">
                                        {station.address}
                                    </p>
                                )}
                                <p className="text-gray-500 mt-1">
                                    Station Number: {station.stationNumber}
                                </p>
                            </div>
                            <button
                                onClick={() => handleRequestFuel(station)}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                                Request Fuel
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {showRequestForm && selectedStation && (
                <FuelRequestForm
                    station={selectedStation}
                    onClose={() => {
                        setShowRequestForm(false);
                        setSelectedStation(null);
                    }}
                />
            )}
        </div>
    );
};

export default MapView;