import MembersTable from '@/components/MembersTable'




const Members = () => {
  //const[userId,setUserId]=useState<string|null>(null);
  return (
    <> 
    <div>
    <div className='flex justify-center mt-2'>
        <div className='flex justify-center bg-blue-500 w-[100px]  text-white'>Members</div>
      </div>
      <MembersTable />
    </div>
    </>  
  )
}

export default Members