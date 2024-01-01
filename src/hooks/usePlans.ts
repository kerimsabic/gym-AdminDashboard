import { useQuery } from "react-query";
import { PlanService } from "../services";

const usePlans = () => {
    return useQuery('plans',
        () => PlanService.getPlans(),
        
    );
    
}

export default usePlans;