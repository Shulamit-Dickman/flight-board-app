import { createSlice } from "@reduxjs/toolkit";
import { FlightStatus } from "../../types/FlightStatus";

export type FilterState = {
    status : FlightStatus,
    destination :string
}

const initialState : FilterState = {
    status:'',
    destination:''
}

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setStatus:(state,action)=>{
            state.status = action.payload;
        },
        setDestination:(state,action)=>{
            state.destination = action.payload;
        },
        clearFilters:() => initialState
    }
})

export const {setStatus,setDestination,clearFilters}= filterSlice.actions;
export default filterSlice.reducer;