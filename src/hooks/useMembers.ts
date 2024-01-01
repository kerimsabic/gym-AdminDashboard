import { MemberService } from "@/services";
import { useQuery } from "react-query";

export function useMembers(){
    return useQuery({
        queryKey: ['members'],  
        queryFn: MemberService.getMembers
    })
}