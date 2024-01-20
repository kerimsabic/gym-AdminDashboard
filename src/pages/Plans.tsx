

//import { Card, Chip, Typography } from '@material-tailwind/react';

/*import { MdDelete, MdOutlineManageAccounts } from 'react-icons/md';
import { IoSettings } from "react-icons/io5";
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { FaPlus } from 'react-icons/fa';
import PlansModal from '@/components/PlansForm';

import { PlanService } from '@/services';*/
import PlansTable from '@/components/PlansTable';



/*const countActiveTrainingPlans = (plans: TrainingPlan[]): number => {
  return plans.reduce((count, plan) => (plan.statusType ? count + 1 : count), 0);
};
const countInactiveTrainingPlans = (plans: TrainingPlan[]): number => {
  return plans.reduce((count, plan) => (!plan.statusType ? count + 1 : count), 0);
};*/



const Plans = () => {

  //const [plans, setPlans] = useState<TrainingPlan[]>([]);

  /*const activePlansCount: number = countActiveTrainingPlans(plans);
  const inactivePlansCount: number = countInactiveTrainingPlans(plans);*/


  return (
    <>
      
     {/*  <div className=' mx-auto mt-10 mb-10 h-full w-[100%]'>

        <div className="grid grid-cols-3 gap-4 max-md:flex maxflex-col">
          <div className=' border-solid border-2 border-black  flex flex-col shadow-2xl rounded-3xl bg-[#191d4f] hover:bg-white'>
            <div className="text-center font-medium mt-5 mb-5 h-full text-white  hover:text-black">
              <p >Total Plans</p>
              <h1 className='text-5xl max-md:text-lg font-black  pt-5'>
                {activePlansCount + inactivePlansCount}
              </h1>
            </div>
          </div>

          <div className=' border-solid border-2 border-black  flex flex-col shadow-2xl rounded-3xl bg-[#191d4f]  hover:bg-white'>
            <div className="text-center font-medium mt-5 h-full text-white  hover:text-black">
              <p>Active Plans</p>
              <h1 className='text-5xl max-md:text-lg font-black  pt-5'>
                {activePlansCount}
              </h1>
            </div>
          </div>

          <div className=' border-solid border-2 border-black  flex flex-col shadow-2xl rounded-3xl bg-[#191d4f]  hover:bg-white'>
            <div className="text-center font-medium mt-5 h-full text-white  hover:text-black">
              <p>Inactive Plans</p>
              <h1 className='text-5xl max-md:text-lg font-black  pt-5'>
                {inactivePlansCount}
              </h1>
            </div>
          </div>
        </div>
      </div>*/}

        <PlansTable />


    </>
  )
}

export default Plans