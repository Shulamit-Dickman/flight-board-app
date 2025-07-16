import DropDown from "../../components/Dropdown";
import {FlightStatus, flightStatusList} from '../../types/FlightStatus'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import { clearFilters, setDestination, setStatus } from "../filters/filtersSlice";
import { useState } from "react";
import { useFlightsQuery } from "./useFlightsQuery";

const FlightsFilters : React.FC= ()=>{
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state)=>state.filters)
    const [localDestination,setLocalDestination]=useState(filters.destination)

    function handleSearch(){
        dispatch(setDestination(localDestination));
    }
    function handleClear(){
        dispatch(clearFilters());
        setLocalDestination('');
    }

    return (
        <div className="w-full bg-gray-100 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-end gap-4">
 <div className="flex flex-col w-full md:w-1/3">
        <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
        <DropDown
          selected={filters.status}
          options={flightStatusList}
          onChange={(value) => dispatch(setStatus(value as FlightStatus))}
        />
        </div>

        <div className="flex flex-col w-full md:w-1/3">
        <label className="text-sm font-medium text-gray-700 mb-1">Destination</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          placeholder="Enter destination"
          value={localDestination}
          onChange={(e) => setLocalDestination(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mt-2 md:mt-0 w-full md:w-1/3">
        <button
          onClick={handleSearch}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 text-sm rounded"
        >
          Clear
        </button>
      </div>
    </div>
        )
}

export default FlightsFilters;