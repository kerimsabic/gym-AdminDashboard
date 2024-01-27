import MembersTable from '@/components/MembersTable'




const Members = () => {
  //const[userId,setUserId]=useState<string|null>(null);
  return (
    <> 
    <div>
    <div className='flex justify-center'>Members</div>
      <MembersTable />
    </div>
    </>  
  )
}

export default Members