import { MemberService } from "@/services";
import { useQuery, useQueryClient } from "react-query"

export function useMember(id:string|null){
    const queryClinet=useQueryClient();
    return useQuery({
        queryKey:["members",{id}],
        queryFn:()=>MemberService.getMemberId(id!),
        enabled: !!id,  //to convert it to boolian value, so we know it is always presnet
        placeholderData:()=>{
            const cacheUsers=queryClinet.getQueriesData(["members"])
        }
    })

}