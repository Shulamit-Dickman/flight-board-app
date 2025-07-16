import { useQuery } from '@tanstack/react-query';
import { Flight } from '../../types/Flight';
import axios from 'axios';
import {FilterState} from '../filters/filtersSlice'

const buildQueryParams = (filters: FilterState): Record<string, string> => {
    const p: Record<string, string> = {};
    if (filters.status?.trim()) p.status = filters.status;
    if (filters.destination?.trim()) p.destination = filters.destination;
    return p;
  };

const fetchFlights = async():Promise<Flight[]>=>{
    const res = await axios.get('/api/flights');
    return res.data;
}

const fetchFlightsWithFilters = async(filters:FilterState):Promise<Flight[]>=>{
    const res = await axios.get('api/flights/search',{params:buildQueryParams(filters)});
    return res.data;
}


export const useFlightsQuery = (filters?: FilterState) => {
    const hasFilters = filters && (filters?.status?.trim() || filters?.destination?.trim())
    return useQuery({
      queryKey: ['flights', filters || {}],
      queryFn: () =>
      hasFilters
          ? fetchFlightsWithFilters(filters)
          : fetchFlights(),
    });
  };