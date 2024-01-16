import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import {setSearch, useDeleteTrainerMutation, useTrainerQuery, useUpdateTrainerMutation} from '@/store/trainersSlice'
import { Trainer } from '@/utils/types';
import { MdDelete, MdOutlineManageAccounts } from 'react-icons/md';
import {  useMemo, useState } from 'react';
import { selectSearch } from '@/store';
import TrainersForm from '../TrainersForm';
import { useAddTrainerMutation } from '@/store/trainersSlice';
import { TrainerRegistrationForm } from '../TrainersForm/TrainersForm';

type Props = {}
const TABLE_HEAD = ["Image", "Name", "Email", "Number","Address", "Edit"];

const TrainersTable = (props: Props) => {

   const{data}=useTrainerQuery(undefined);
   const search = useSelector(selectSearch);
   const dispatch= useDispatch();
   const [deleteTrainer]= useDeleteTrainerMutation();
   const [addTrainer]=useAddTrainerMutation();
   const [updateTrainer]=useUpdateTrainerMutation();

   const [isAddFormVisible, setAddFormVisible] = useState(false);
   const handleCancelAdd = () => { setAddFormVisible(false);};

   const [selectedTrainer, setSelectedTrainer] = useState<TrainerRegistrationForm | null>(null);

    const handleEditTrainer = (trainer: Trainer) => {
      setSelectedTrainer(trainer);
      setAddFormVisible(true);
    };


   const handleDeleteClick = async (id: string, firstName: string, lastName: string) => {
    try {
        if (window.confirm(`Are you sure you want to delete this TRAINER:   "${firstName.toUpperCase() + " " + lastName.toUpperCase()}"`)) {
            await deleteTrainer({ id: id })
        }
    } catch (error) {
        console.error('Error deleting trainer:', error);
    }
};


   const filteredTrainers=useMemo(()=>(
    (data||[]).filter((trainer)=>trainer.firstName.toLowerCase().includes(search.toLowerCase())||trainer.lastName.toLowerCase().includes(search.toLowerCase()))
   ), [data,search])


  return (
    <>
    {isAddFormVisible && (
        <TrainersForm
            onCancel={handleCancelAdd}
            onSubmitTrainer={async (formData) => {
                try{
                    await addTrainer(formData)
                }catch(error){
                    console.log(error)
                }
                setAddFormVisible(false);
            }}
            
            initialData={selectedTrainer}
            onUpdateTrainer={async (formData)=>{
                console.log(formData.id)
                try{
                    await updateTrainer({id:formData.id, data:formData})
                } catch(error){
                    console.log(error)
                }
                setAddFormVisible(false);
            }}
        />
        )}
    <div className="w-[80%]  mx-auto flex md:justify-center max-md:w-[95%] mt-10 ">
        <div className=" w-full  max-md:overflow-x-scroll  " >
            <div className="w-full flex  mb-5 justify-between ">
                <div className="w-[50%]  max-sm:hidden flex items-center shadow-sm">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(event)=>{
                            dispatch(setSearch(event.target.value))
                        }}
                        className="border p-2 w-full"
                    />
                    <MagnifyingGlassIcon className="h-6 w-6 ml-2 text-gray-500 shadow-sm" />
                </div>

                <button onClick={() => {setAddFormVisible(true);setSelectedTrainer(null)}}
                    className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded flex items-center gap-3">
                    <FaPlus />
                    Add Trainer
                </button>

                

            </div>
            <table className="w-full min-w-max table-auto text-center shadow-2xl rounded-lg ">
                <thead className=''>
                    <tr className='bg-[#191d4f]'>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                                <div className="leading-none opacity-70 font-bold text-white">
                                    {head}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {(filteredTrainers).map((trainer: Trainer) => {

                        const classes = "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={trainer.id} >
                                <td className={classes}>
                                    <div className="font-normal">
                                        {trainer.image}
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="font-normal">
                                        {trainer.firstName + " " + trainer.lastName}
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="font-normal">
                                        {trainer.email}
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="font-normal">
                                        {trainer.phone}
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="font-normal">
                                        {trainer.address}
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="text-3xl flex justify-evenly"
                                    >
                                        <button className="text-red-700" onClick={() => handleDeleteClick(trainer.id!, trainer.firstName, trainer.lastName)}><MdDelete /></button>
                                        <button className="text-blue-900" onClick={() => {handleEditTrainer(trainer!)}}><MdOutlineManageAccounts /></button>
                                    </div>
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default TrainersTable