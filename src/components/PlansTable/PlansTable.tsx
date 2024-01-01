import { PlanService } from '@/services'
import { TrainingPlan } from '@/utils/types'
import React, { useEffect, useState } from 'react'
import { IoSettings } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import PlansModal from '../PlansModal'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { FaPlus } from 'react-icons/fa'
import { Chip } from '@material-tailwind/react'
import usePlans from '@/hooks/usePlans'
import useCreatePlans from '@/hooks/planHooks/useCreatePlans'
import useDeletePlans from '@/hooks/planHooks/useDeletePlans'
import axios from 'axios'
import { BASE_URL } from '@/utils/data'

type Props = {}


const TABLE_HEAD = ["Plan Name", "Price", "Description", "Status", "Actions"];

const PlansTable = (props: Props) => {

    const { data, isLoading, error, isError } = usePlans();

    const deletePlans = useDeletePlans();

    const handleDeletePlan=(id:string)=>{
      deletePlans.mutate(id)
    }

    const [openModal, setOpenModal] = useState(false);

    const countActiveTrainingPlans = (plans: TrainingPlan[]): number => {
        return plans.reduce((count, plan) => (plan.statusType ? count + 1 : count), 0);
    };
    const countInactiveTrainingPlans = (plans: TrainingPlan[]): number => {
        return plans.reduce((count, plan) => (!plan.statusType ? count + 1 : count), 0);
    };
    // const activePlansCount: number = countActiveTrainingPlans(plans);
    // const inactivePlansCount: number = countInactiveTrainingPlans(plans);



    const [search, setSearch] = useState("");

    function handleSubmit(value: any): void {
        throw new Error('Function not implemented.')
    }

    return (
        <>

            {openModal && <PlansModal closeModal={setOpenModal} addPlan={handleSubmit} />}
            <div className='w-[90%] mx-auto mt-[80px]  max-md:w-[95%] '>
                <div className="w-full flex  mb-5 justify-between">
                    <div className="w-[50%]  max-sm:hidden flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="border p-2 w-full"
                        />
                        <MagnifyingGlassIcon className="h-6 w-6 ml-2 text-gray-500" />
                    </div>

                    <button
                        onClick={() => setOpenModal(!openModal)}
                        className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded flex items-center gap-3">
                        <FaPlus />
                        Add Plan
                    </button>

                </div>

                {
                    // Loading data
                    isLoading &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }



                {
                    // If not loading, and not error, show data
                    !isLoading &&

                    <div className='mb-16'>
                        <div className="h-full w-full overflow-scroll" >
                            <table className="w-full min-w-max table-auto  text-center">
                                <thead className=''>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head}
                                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                            >
                                                <div

                                                    className="font-normal leading-none opacity-70" >
                                                    {head}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.filter((plan) => {
                                        if (search === "") {
                                            return plan
                                        }
                                        else if (plan.name.toLowerCase().includes(search.toLowerCase())) {
                                            return plan;
                                        }
                                    })
                                        .map((plan, index) => {
                                            const isLast = index === data.length - 1;
                                            const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={plan.id}>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {plan.name}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {plan.price}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {plan.description}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Chip
                                                            value={plan.statusType ? "online" : "offline"}
                                                            className={plan.statusType ? "text-green-500" : "text-red-500"}
                                                        />
                                                    </td>

                                                    <td className={classes}>
                                                        <div className="text-3xl flex justify-evenly"
                                                        >
                                                            <button className="text-red-700" onClick={() => handleDeletePlan(plan.id)}><MdDelete /></button>
                                                            <button><IoSettings /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>




        </>
    )
}

export default PlansTable