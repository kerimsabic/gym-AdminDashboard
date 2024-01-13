import { PlanService } from "@/services";
import { Member, TrainingPlan } from "@/utils/types";
import { error } from "console";
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