import AttendaceChart from '@/components/AttendaceChart';
import Table from '@/components/MembersTable'
import { usePlans } from '@/hooks/planHooks';
import { useGetAdminsQuery } from '@/store/adminSlice'
import { useGetEquipmentsQuery } from '@/store/equipmentSlice';
import { useGetMembersQuery } from '@/store/memberSlice'
import { useTrainerQuery } from '@/store/trainersSlice';
import { SecondChart } from '.';




const Home = () => {

  const { data: members } = useGetMembersQuery();
  const { data: admins } = useGetAdminsQuery();
  const { data: trainers } = useTrainerQuery(undefined);
  const {data:plans}=usePlans();
  const {data:equipment}=useGetEquipmentsQuery();


  const totalMembers = members?.length;
  const totalAdmins = admins?.length;
  const totalTrainers = trainers?.length;
  const totalPlans=plans?.length;
  const totalEquipment=equipment?.length;

  return (
    <>
    <div className='flex justify-center mt-2'>
          <div className='flex justify-center bg-blue-500 w-[100px]  text-white'>Home</div>
        </div>
    <div>
      <div className="mt-4 w-full max-md:w-[50%] grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4">
        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <span className='text-2xl sm:text-3xl leading-none font-bold text-blue-900'>{totalMembers}</span>
              <h3 className='text-base font-normal text-gray-500'>Total Members</h3>
            </div>
          </div>
        </div>
        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <span className='text-2xl sm:text-3xl leading-none font-bold text-blue-900'>{totalTrainers}</span>
              <h3 className='text-base font-normal text-gray-500'>Total Trainers</h3>
            </div>
          </div>
        </div>
        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <span className='text-2xl sm:text-3xl leading-none font-bold text-blue-900'>{totalAdmins}</span>
              <h3 className='text-base font-normal text-gray-500'>Total Admins</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full  grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
          <div className='flex items-center justify-center'>
            <div className='flex-shrink-0'>
              <span className='flex justify-center text-2xl sm:text-3xl leading-none font-bold text-blue-900'>{totalPlans}</span>
              <h3 className='text-base font-normal text-gray-500'>Total Plans</h3>
            </div>
          </div>
        </div>
        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
          <div className='flex items-center justify-center'>
            <div className='flex-shrink-0'>
              <span className='flex justify-center text-2xl sm:text-3xl leading-none font-bold text-blue-900'>{totalEquipment}</span>
              <h3 className='text-base font-normal text-gray-500'>Total Machines</h3>
            </div>
          </div>
        </div>
        
      </div>

      <div className="mt-4 w-full  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-xs:hidden">
        <div className=' '>
          <div className=''>
            <AttendaceChart />
          </div>
        </div>
        <div className=' '>
          <div className=''>
            <SecondChart />
          </div>
        </div>
      </div>

      <Table />

    </div>
    </>

  )
}

export default Home