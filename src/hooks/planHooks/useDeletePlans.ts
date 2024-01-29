import { PlanService } from "@/services"
import { useMutation, useQueryClient } from "react-query"

export function useDeletePlans(){

    const queryClinet=useQueryClient() 

    return useMutation({
        
        mutationFn:  (id:string)=>PlanService.deletePlan(id),
        onSuccess:()=>{
            console.log("deleted successfully"),
            queryClinet.invalidateQueries({queryKey:["plans"]})  //if i don put it here it wont reload the members by itself
        },
        onSettled:async (error)=>{
            if(error){
                 console.log(error);
            }
            else{
               await queryClinet.invalidateQueries({queryKey:["plans"]})
            }
           
        },
        
    })
}
export default useDeletePlans