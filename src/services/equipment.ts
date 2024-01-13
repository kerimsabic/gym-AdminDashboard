import { Equipment } from "@/utils/types"
import appAxios from "./appAxios"

const getEquipment=async():Promise<Equipment[]>=>{
    return await appAxios.get('/equipment/').then(result=>result.data)
}

const getEquipmentId=async(id:string)=>{
    return (await appAxios.get(`/equipment/${id}`)).data;
}

const addEquipment=async(equipment:Equipment): Promise<Equipment>=>{
    return await  appAxios.post("/equipment/add", equipment).then((result)=>{return result.data})
}

const deleteEqipment=async(id:String)=>{
    return await appAxios.delete(`/equipment/${id}`)
}
const updateEquipment=async(equipment:Equipment)=>{
    return await appAxios.put(`/equipment/${equipment.id}`, equipment);
}

export default {getEquipment, getEquipmentId, deleteEqipment, updateEquipment, addEquipment}