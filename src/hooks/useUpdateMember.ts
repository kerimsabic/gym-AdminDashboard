import { MemberService } from "@/services";
import { Member } from "@/utils/types";
import { error } from "console";
import { useMutation, useQueryClient } from "react-query";

export function useUpdateMember(){
    const queryClinet=useQueryClient();
    return useMutation({
        mutationFn:(member:Member)=>MemberService.updateMember(member),
        onSettled: async(_, error, variables)=>{
            if(error){
                console.log(error);
            }
            else{
                await queryClinet.invalidateQueries({queryKey:["members"]});
                await queryClinet.invalidateQueries({queryKey:["members", {id:variables.id}]})
            }
        }
    })
}