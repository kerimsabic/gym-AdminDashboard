import { PlanService } from "@/services";
import { useQuery } from "react-query";

export function usePlans(){
    return useQuery({
        queryKey:["plans"],
        queryFn:PlanService.getPlans,
    })
}
export default usePlans