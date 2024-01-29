import TrainersTable from '@/components/TrainersTable';




const Trainers = () => {
  return (
    <div>
      <div className='flex justify-center mt-2'>
        <div className='flex justify-center bg-blue-500 w-[100px]  text-white'>Trainers</div>
      </div>
      <TrainersTable />
    </div>
  )
}

export default Trainers