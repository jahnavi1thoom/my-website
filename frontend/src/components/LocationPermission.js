import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LocationPermission = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [fuelStations, setFuelStations] = useState([]);
  const navigate = useNavigate();

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          fetchNearbyFuelStations(location);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const fetchNearbyFuelStations = async (location) => {
    try {
      const response = await axios.get(`/api/fuel-stations/nearby`, {
        params: {
          lat: location.lat,
          lng: location.lng
        }
      });
      setFuelStations(response.data);
    } catch (error) {
      console.error('Error fetching fuel stations:', error);
    }
  };

  const handleStationSelect = (station) => {
    navigate('/fuel-request', { state: { station } });
  };

  return (
    <div className="h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Nearby Fuel Stations</h2>
      {!userLocation ? (
        <div className="text-center">
          <p>Please allow location access to view nearby fuel stations</p>
          <button
            onClick={requestLocationPermission}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Enable Location
          </button>
        </div>
      ) : (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation}
            zoom={14}
          >
            {/* User location marker */}
            <Marker
              position={userLocation}
              icon={{
                url: '/user-marker.png',
                scaledSize: { width: 40, height: 40 }
              }}
            />
            
            {/* Fuel station markers */}
            {fuelStations.map((station) => (
              <Marker
                key={station._id}
                position={{ lat: station.location.lat, lng: station.location.lng }}
                onClick={() => handleStationSelect(station)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default LocationPermission;