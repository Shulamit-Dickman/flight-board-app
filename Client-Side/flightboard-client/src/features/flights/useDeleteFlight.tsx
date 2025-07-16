import { useQueryClient,useMutation } from "@tanstack/react-query";
import axios from "axios";

 export const useDeleteFlight = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:async(flightId:string)=>{
            return await axios.delete(`api/flights/${flightId}`)
        },
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['flights']})        
    })
 }

