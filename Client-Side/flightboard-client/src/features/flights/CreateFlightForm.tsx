import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import React, { useState } from 'react'
import { FlightDto } from '../../types/Flight';
import { useCreateFlight } from './useCreateFlight';
import { useAppDispatch,useAppSelector } from '../../app/hooks';
import { clearForm, setDepartureTime, setDestination, setFlightNumber, setGate } from './flightFormSlice';

const CreateFlightForm : React.FC= ()=>{
    const dispatch = useAppDispatch();
    const form = useAppSelector(state=>state.flightForm)
    const [error,setError]= useState('');
    const createFlight = useCreateFlight();

function handleSubmit(){
    if (!form.flightNumber || !form.destination || !form.gate || !form.departureTime) {
        setError('All fields are required');
        return;
      }

      if (new Date(form.departureTime) <= new Date()) {
        setError('Departure time must be in the future');
        return;
      }
      setError('');
      createFlight.mutate(form,{
        onSuccess:()=>{
            dispatch(clearForm())
        },
        onError:()=>{
            setError('Failed to create flight');
        }
      })
}

return (
    <div className="border-b border-gray-900/10 pb-12">
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-2 sm:col-start-1">
        <label htmlFor="flightNumber" className="block text-sm/6 font-medium text-gray-900">
          Flight Number
        </label>
        <div className="mt-2">
          <input
            id="flightNumber"
            name="flightNumber"
            value={form.flightNumber}
            onChange={(e)=> dispatch(setFlightNumber(e.target.value))}
            type="text"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="destination" className="block text-sm/6 font-medium text-gray-900">
          Destination
        </label>
        <div className="mt-2">
          <input
            id="destination"
            name="destination"
            value={form.destination}
            onChange={(e)=>{dispatch(setDestination(e.target.value))}}
            type="text"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="gate" className="block text-sm/6 font-medium text-gray-900">
          Gate
        </label>
        <div className="mt-2">
          <input
            id="gate"
            name="gate"
            value={form.gate}
            onChange={(e)=>{dispatch(setGate(e.target.value))}}
            type="text"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="departureTime" className="block text-sm/6 font-medium text-gray-900">
        Departure Time
        </label>
        <div className="mt-2">
          <input
            id="departureTime"
            name="departureTime"
            value={form.departureTime}
            onChange={(e)=>{dispatch(setDepartureTime(e.target.value))}}
            type="datetime-local"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        Create Flight
      </button>
      </div>
      </div>
)
}

export default CreateFlightForm;