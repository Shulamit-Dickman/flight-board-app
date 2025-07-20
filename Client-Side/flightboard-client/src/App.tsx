import React from 'react';
import './App.css';
import FlightHubConnector from './features/flights/FlightHubConnector';
import FlightForm from './features/flights/FlightForm';
import FlightBoard from './features/flights/FlightBoard';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

function App() {
  return (<>
      <FlightHubConnector /> 
        <Routes>
          <Route path="/" element={<FlightBoard />} />
          <Route path="/add-flight" element={<FlightForm />} />
        </Routes>
    </>
  );
}

export default App;
