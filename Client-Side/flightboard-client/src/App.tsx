import React from 'react';
import './App.css';
import FlightHubConnector from './features/flights/FlightHubConnector';
import FlightsTable from './features/flights/FlightsTable';
import FlightsFilters from './features/flights/FlightsFilters';
import CreateFlightForm from './features/flights/CreateFlightForm';

function App() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <FlightHubConnector /> 
      <CreateFlightForm />
      <FlightsFilters/>
      <FlightsTable />
    </div>
  );
}

export default App;
