import { useQueryClient,useMutation } from "@tanstack/react-query";
import { FlightDto } from "../../types/Flight";
import axios from "axios";
import { API_BASE_URL } from '../../config'

export const useCreateFlight=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(flight:FlightDto)=>{
           const response =  await axios.post(API_BASE_URL,flight)
           return response.data;
        },
        onSuccess:()=> queryClient.invalidateQueries({queryKey:['flights']})
    })
}