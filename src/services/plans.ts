import appAxios from "./appAxios";
import { TrainingPlan } from "../utils/types";


const getPlans=async():Promise<TrainingPlan[]>=>{
    return await appAxios.get('/trainingPlans/').then(result=>result.data)
}

const getPlanId=async(id:string)=>{
    return (await appAxios.get(`/trainingPlan/${id}`)).data
}

const createPlan=async(plan:TrainingPlan): Promise<TrainingPlan>=>{
    return await appAxios.post('/trainingPlans/create', plan).then((result)=>{return result.data})
}

const deletePlan=async(id:String)=>{
    return await appAxios.delete(`/trainingPlans/${id}`);
}

const updatePlan=async(plan:TrainingPlan)=>{
    return await appAxios.put(`/trainingPlans/${plan.id}`, plan);
}

export default { getPlans,getPlanId,createPlan,deletePlan,updatePlan};