
import { MemberService } from "@/services"
import { useMutation, useQueryClient } from "react-query"

export function useDeleteMember(){

    const queryClinet=useQueryClient() 

    return useMutation({
        
        mutationFn:  (id:string)=>MemberService.deleteMember(id),
        onSuccess:()=>{
            console.log("deleted successfully"),
            queryClinet.invalidateQueries({queryKey:["members"]})  //if i don put it here it wont reload the members by itself
        },
        onSettled:async (error)=>{
            if(error){
                 console.log(error);
            }
            else{
               await queryClinet.invalidateQueries({queryKey:["members"]})
            }
           
        },
        
    })
}