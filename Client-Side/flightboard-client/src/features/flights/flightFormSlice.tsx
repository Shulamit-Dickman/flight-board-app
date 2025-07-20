import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
        setField: (state, action: PayloadAction<{ field: keyof FlightDto; value: string }>) => {
            const { field, value } = action.payload;
            (state as any)[field] = value; 
          },
        clearForm:()=>initialState
    
    }
})

export const {setFlightNumber,setDestination,setGate,setDepartureTime,clearForm,setField} = flightFormSlice.actions;
export default flightFormSlice.reducer;