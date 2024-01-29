
import { StatusType, TrainingPlan } from '@/utils/types'
import React, {  useState } from 'react'
import { MdDelete, MdOutlineManageAccounts } from 'react-icons/md'
import PlansForm from '../PlansForm'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { FaPlus } from 'react-icons/fa'
import { Chip } from '@material-tailwind/react'
import usePlans from '@/hooks/usePlans'
import useDeletePlans from '@/hooks/planHooks/useDeletePlans'
import { PlanRegisterForm } from '../PlansForm/PlansForm'
import { useCreatePlans } from '@/hooks/planHooks'





const TABLE_HEAD = ["Plan Name",  "Description","Price", "Status", "Actions"];

const PlansTable = () => {

    const plansData = usePlans();
    const createPlan = useCreatePlans();

    const deletePlans = useDeletePlans();
    const handleDeletePlan=(id:string,name:string)=>{
      if (window.confirm(`Are you sure you want to delete this plan?   "${name}"`)) {
      deletePlans.mutate(id)
    }
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPlans, setFilteredPlans] = useState<TrainingPlan[] | null>(null);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      const filteredPlans = plansData.data?.filter(plan =>
        plan.name.toLowerCase().includes(event.target.value.toLowerCase()));
      setFilteredPlans(filteredPlans!);
    };

    const [openForm, setOpenForm] = useState(false);

 
    const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null);
    const handleEditPlan = (plan: TrainingPlan) => {
      setSelectedPlan(plan);
      setOpenForm(true);
    };

   

    return (
        <>
        {openForm && 
          <PlansForm closeForm={setOpenForm} 
          initialData={selectedPlan} 
          onSubmitMember={async(data:PlanRegisterForm)=>{
          createPlan.mutate(data);
          if (createPlan.isSuccess){
            
              window.confirm("Plan successfully added")
          }
          }
          }/>}
        <div className="w-[80%]  mx-auto flex md:justify-center max-md:w-[95%] mt-10 ">
          <div className=" w-full  max-md:overflow-x-scroll  " >
            <div className="w-full flex  mb-5 justify-between ">
              <div className="w-[50%]  max-sm:hidden flex items-center shadow-sm">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="border p-2 w-full"
                />
                <MagnifyingGlassIcon className="h-6 w-6 ml-2 text-gray-500 shadow-sm" />
              </div>
  
              <button onClick={() => {setOpenForm(!openForm); setSelectedPlan(null)}}
                className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded flex items-center gap-3">
                <FaPlus />
                Add Plan
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
                {(filteredPlans || plansData.data)?.map(({ id,name,description,price,statusType }, index) => {
                  const isLast = index === plansData.data!.length - 1;
                  const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";
  
                  return (
                    <tr key={id} >
                      <td className={classes}>
                        <div className="font-normal">
                          {name}
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="font-normal">
                          {description}
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="font-normal">
                          {price}
                        </div>
                      </td>
                      <td className={classes}>
                        <Chip
                           value={statusType === StatusType.ONLINE ? "Online" : "Offline"}
                           className={statusType === StatusType.ONLINE ? "text-green-500" : "text-red-500"}
                        />
                      </td>
                      <td className={classes}>
                        <div className="text-3xl flex justify-evenly"
                        >
                          <button className="text-red-700" onClick={() => handleDeletePlan(id!,name)}><MdDelete /></button>
                          <button className="text-blue-900" onClick={()=>handleEditPlan({ id, name, description, price, statusType })}><MdOutlineManageAccounts /></button>
                        
  
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

export default PlansTable