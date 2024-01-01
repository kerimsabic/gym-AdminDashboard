import appAxios from "./appAxios";
import { Trainer } from "../utils/types";


const getTrainers=async():Promise<Trainer[]>=>{
    return await appAxios.get('/trainers/').then(result=>result.data)
}

const getTrainerId=async(id:string)=>{
    return (await appAxios.get(`/trainers/${id}`)).data
}

const createTrainer=async(trainer:Trainer): Promise<Trainer>=>{
    return await appAxios.post('/trainers/register', trainer).then((result)=>{return result.data})
}

const deleteTrainer=async(id:String)=>{
    return await appAxios.delete(`/trainers/${id}`)
}

const updateTrainer=async(trainer:Trainer)=>{
    return await appAxios.put(`/trainers/${trainer.id}`, trainer);
}

export default { getTrainers,getTrainerId,createTrainer,deleteTrainer,updateTrainer};