import { useQueryClient,useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from '../../config'

 export const useDeleteFlight = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:async(flightId:string)=>{
            return await axios.delete(`${API_BASE_URL}/${flightId}`)
        },
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['flights']})        
    })
 }

