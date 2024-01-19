import MembersTable from '@/components/MembersTable'
import  { useState } from 'react'

type Props = {
  setUserId: (value: string) => void;
}

const Members = (props: Props) => {
  const[userId,setUserId]=useState<string|null>(null);
  return (
    <> 
    <div>
      <MembersTable setUserId={setUserId}/>
    </div>
    </>  
  )
}

export default Members