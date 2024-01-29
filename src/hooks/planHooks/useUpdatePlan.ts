import { PlanService } from "@/services";
import {  TrainingPlan } from "@/utils/types";

import { useMutation, useQueryClient } from "react-query";

export function useUpdatePlan(){
    const queryClinet=useQueryClient();
    return useMutation({
        mutationFn:(plan:TrainingPlan)=>PlanService.updatePlan(plan),
        onSettled: async(_, error, variables)=>{
            if(error){
                console.log(error);
            }
            else{
                await queryClinet.invalidateQueries({queryKey:["plans"]});
                await queryClinet.invalidateQueries({queryKey:["plans", {id:variables.id}]})
            }
        }
    })
}