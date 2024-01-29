
import AdminTable from '@/components/AdminTable';





const Admin = () => {

  
  return (
      <div>
       <div className='flex justify-center mt-2'>
        <div className='flex justify-center bg-blue-500 w-[100px]  text-white'>Admins</div>
      </div>
        <AdminTable/>
      </div>
    )
}

export default Admin