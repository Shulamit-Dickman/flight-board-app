import React from 'react';
import { useFlightsQuery } from './useFlightsQuery';
import { useDeleteFlight } from './useDeleteFlight';
import { useAppSelector } from '../../app/hooks';
import { Trash2 } from "lucide-react";


export default function FlightsTable () {
  const filters = useAppSelector((state)=>state.filters);
  const { data: flights, isLoading, error } = useFlightsQuery(filters);
  const deleteFlight = useDeleteFlight(); 

  if (isLoading) return <div className="text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading flights</div>;

  return (
    <div className="p-4">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border"># Flight</th>
            <th className="p-2 border">Destination</th>
            <th className="p-2 border">Gate</th>
            <th className="p-2 border">Departure</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights?.map((flight) => (
            <tr key={flight.id} className="text-center">
              <td className="border p-2">{flight.flightNumber}</td>
              <td className="border p-2">{flight.destination}</td>
              <td className="border p-2">{flight.gate}</td>
              <td className="border p-2">{new Date(flight.departureTime).toLocaleTimeString()}</td>
              <td className="border p-2">{flight.status}</td>
              <td className="border p-2">
                <button 
                className="text-black-600 hover:text-black-700 hover:bg-black-50 transition-colors duration-200"
                onClick={()=>deleteFlight.mutate(flight.id)}
                >
                   <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

