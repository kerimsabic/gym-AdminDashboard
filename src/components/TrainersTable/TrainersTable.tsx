import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import {setSearch, useTrainerQuery} from '@/store/trainersSlice'
import { Trainer } from '@/utils/types';
import { MdDelete, MdOutlineManageAccounts } from 'react-icons/md';
import { useEffect, useMemo } from 'react';
import { selectSearch } from '@/store';

type Props = {}
const TABLE_HEAD = ["Image", "Name", "Email", "Number","Address","Status", "Edit"];

const TrainersTable = (props: Props) => {

   const{data}=useTrainerQuery(undefined);
   const search = useSelector(selectSearch);
   const dispatch= useDispatch();

   const filteredTrainers=useMemo(()=>(
    (data||[]).filter((trainer)=>trainer.firstName.toLowerCase().includes(search.toLowerCase())||trainer.lastName.toLowerCase().includes(search.toLowerCase()))
   ), [data,search])
  return (
    <>
    {/*{isAddFormVisible && (
        <AdminsForm
            onCancel={handleCancelAdd}
            onSubmit={async (formData) => {
                try{
                    await addAdmin(formData)
                }catch(error){
                    console.log(error)
                }
               
                console.log('Adding admin:', formData);
                setAddFormVisible(false);
            }}
        />
        )}*/}
    <div className="w-[80%]  mx-auto flex md:justify-center max-md:w-[95%] mt-10 ">
        <div className=" w-full  max-md:overflow-x-scroll  " >
            <div className="w-full flex  mb-5 justify-between ">
                <div className="w-[50%]  max-sm:hidden flex items-center shadow-sm">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(event)=>{
                            dispatch(setSearch(event?.target.value))
                        }}
                        className="border p-2 w-full"
                    />
                    <MagnifyingGlassIcon className="h-6 w-6 ml-2 text-gray-500 shadow-sm" />
                </div>

                <button onClick={() => {}}
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
                                    <div className="font-normal">
                                        {trainer.statusType}
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="text-3xl flex justify-evenly"
                                    >
                                        <button className="text-red-700" onClick={() => {}}><MdDelete /></button>
                                        <button className="text-blue-900" onClick={() => { }}><MdOutlineManageAccounts /></button>


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