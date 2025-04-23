// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import SelectionPage from './components/SelectionPage';
import UserLogin from './components/UserLogin';
import FuelStationRegister from './components/FuelStationRegister';
import MapView from './components/MapView';
import StationRequests from './components/StationRequests';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/selection" element={<SelectionPage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/station-register" element={<FuelStationRegister />} />
        <Route path="/map-view" element={<MapView />} />
        <Route path="/station/requests" element={<StationRequests />} />
      </Routes>
    </Router>
  );
}

export default App;