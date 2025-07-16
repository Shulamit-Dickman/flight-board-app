import { useQueryClient,useMutation } from "@tanstack/react-query";
import { FlightDto } from "../../types/Flight";
import axios from "axios";

export const useCreateFlight=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(flight:FlightDto)=>{
           const response =  await axios.post('api/flights',flight)
           return response.data;
        },
        onSuccess:()=> queryClient.invalidateQueries({queryKey:['flights']})
    })
}