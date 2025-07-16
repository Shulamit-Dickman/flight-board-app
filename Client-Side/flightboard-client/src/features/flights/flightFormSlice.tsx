import { createSlice } from "@reduxjs/toolkit";
import { FlightDto } from "../../types/Flight";

const initialState:FlightDto = {
    departureTime:'',
    destination:'',
    gate:'',
    flightNumber:''
}

const flightFormSlice = createSlice({
    name:'flightForm',
    initialState,
    reducers:{
        setFlightNumber:(state,action)=>{
            state.flightNumber = action.payload;
        },
        setDestination:(state,action)=>{
            state.destination = action.payload;
        },
        setGate:(state,action)=>{
            state.gate = action.payload;
        },
        setDepartureTime:(state,action)=>{
            state.departureTime = action.payload;
        },
        clearForm:()=>initialState
    
    }
})

export const {setFlightNumber,setDestination,setGate,setDepartureTime,clearForm} = flightFormSlice.actions;
export default flightFormSlice.reducer;