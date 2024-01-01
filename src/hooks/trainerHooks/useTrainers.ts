import { TrainerService } from "@/services";
import { useQuery } from "react-query";

export function useMembers(){
    return useQuery({
        queryKey: ['trainers'],  
        queryFn: TrainerService.getTrainers
    })
}
export default useMembers;