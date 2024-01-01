import { PlanService } from "@/services";
import { useQuery, useQueryClient } from "react-query";

export function usePlan(id:string|null){
    const queryClinet=useQueryClient();
    return useQuery({
        queryKey:["plans",{id}],
        queryFn:()=>PlanService.getPlanId(id!),
        enabled: !!id,
    })
}
export default usePlan