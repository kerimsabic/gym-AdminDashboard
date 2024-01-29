import { PlanService } from "@/services"
import { TrainingPlan } from "@/utils/types"
import { useMutation, useQueryClient } from "react-query"

export function useCreatePlans(){

    const queryClinet=useQueryClient() 

    return useMutation({
        
        mutationFn:  (plan:TrainingPlan)=>PlanService.createPlan(plan),
        onSuccess:()=>{
            console.log("created successfully"),
            queryClinet.invalidateQueries({queryKey:["plans"]})  //if i don put it here it wont reload the members by itself
        },
        
        
    })
}
export default useCreatePlans