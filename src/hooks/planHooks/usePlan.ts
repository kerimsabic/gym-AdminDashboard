import { PlanService } from "@/services";
import { useQuery } from "react-query";

export function usePlan(id:string|null){
    return useQuery({
        queryKey:["plans",{id}],
        queryFn:()=>PlanService.getPlanId(id!),
        enabled: !!id,
    })
}
export default usePlan