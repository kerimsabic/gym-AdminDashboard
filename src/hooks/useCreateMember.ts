import { MemberService } from "@/services"
import { Member } from "@/utils/types"
import { useMutation, useQueryClient } from "react-query"
import { useCreatePlans } from "./planHooks/useCreatePlans"

export function useCreateMember(){

    const queryClinet=useQueryClient() 

    return useMutation({
        
        mutationFn:  (member:Member)=>MemberService.createMember(member),
        onSuccess:async (error)=>{
            if(error){
                 console.log(error);
            }
            else{
               await queryClinet.invalidateQueries({queryKey:["members"]})
            }
           
        },
        
        
    })
}
