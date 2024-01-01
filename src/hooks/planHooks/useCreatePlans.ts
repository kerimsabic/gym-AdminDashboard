import { PlanService } from "@/services"
import { TrainingPlan } from "@/utils/types"
import { useMutation, useQueryClient } from "react-query"

export function useCreatePlans(){

    const queryClinet=useQueryClient() 

    return useMutation({
        
        mutationFn:  (plan:TrainingPlan)=>PlanService.createPlan(plan),
        onSuccess:async (error)=>{
            if(error){
                 console.log(error);
            }
            else{
               await queryClinet.invalidateQueries({queryKey:["plans"]})
            }
           
        },
        
        
    })
}
export default useCreatePlans