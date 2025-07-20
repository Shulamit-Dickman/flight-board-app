import DropDown from "../../components/Dropdown";
import {FlightStatus, flightStatusList} from '../../types/FlightStatus'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import { clearFilters, setDestination, setStatus } from "../filters/filtersSlice";
import { useState } from "react";
import { useFlightsQuery } from "./useFlightsQuery";
import { Box, Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function FlightsFilters (){
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
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ md: "flex-end" }}
        gap={2}
        p={2}
        borderRadius={2}
        boxShadow={1}
        bgcolor="grey.100"
      >
        <Box flex={1}>
          <DropDown
            selected={filters.status}
            options={flightStatusList}
            onChange={(value) => dispatch(setStatus(value as FlightStatus))}
          />
        </Box>
  
        <Box flex={1}>
          <TextField
            id="outlined-search"
            label="Destination"
            type="search"
            variant="outlined"
            size="small"
            fullWidth
            value={localDestination}
            onChange={(e) => setLocalDestination(e.target.value)}            
          />
        </Box>
  
        <Box display="flex" gap={1} flex={1}>
          <Button
            onClick={handleSearch}
            variant="contained"
            fullWidth
            startIcon={<SearchIcon />}
            sx={{ height: 40 }}
          >
            Search
          </Button>
          <Button
            onClick={handleClear}
            variant="outlined"
            fullWidth
            startIcon={<SearchOffIcon />}
            sx={{ height: 40 }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    );
  }
