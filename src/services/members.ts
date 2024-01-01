import { Member } from "@/utils/types"
import appAxios from "./appAxios"

const getMembers=async():Promise<Member[]>=>{
    return await appAxios.get('/members/').then(result=>result.data)
}

const getMemberId=async(id:string)=>{
    return (await appAxios.get(`/members/${id}`)).data;
}

const createMember=async(member:Member): Promise<Member>=>{
    return await  appAxios.post("/members/register", member).then((result)=>{return result.data})
}

const deleteMember=async(id:String)=>{
    return await appAxios.delete(`/members/${id}`)
}
const updateMember=async(member:Member)=>{
    return await appAxios.put(`/members/${member.id}`, member);
}

export default {getMembers, createMember, deleteMember, updateMember, getMemberId}