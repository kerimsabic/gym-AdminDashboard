import { useGetAdminsQuery, useDeleteAdminMutation, useAddAdminMutation, } from '@/store/adminSlice';
import { Admin } from '@/utils/types';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdDelete, MdOutlineManageAccounts } from 'react-icons/md';
import AdminsForm from '../AdminsForm';
import { SubmitHandler } from 'react-hook-form';
import { AdminsRegistrationForm } from '../AdminsForm/AdminsForm';



type Props = {}

const TABLE_HEAD = ["Image", "Name", "Email", "Phone", "Address", "Actions"];

const AdminTable = (props: Props) => {

    const { data: admins, error, isLoading } = useGetAdminsQuery();
    const [deleteAdmin] = useDeleteAdminMutation();
    const [addAdmin]=useAddAdminMutation();
    const [isAddFormVisible, setAddFormVisible] = useState(false);


    const handleDeleteClick = async (id: string, firstName: string, lastName: string) => {
        try {
            if (window.confirm(`Are you sure you want to delete this ADMIN:   "${firstName + " " + lastName}"`)) {
                await deleteAdmin({ id: id })
            }
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    /*/const handelAdminSubmition: SubmitHandler<AdminsRegistrationForm> = async (data) => {
        try {
          // Call the mutation for adding admin
          const result = await addAdmin(data);
    
          // Check if the mutation was successful
          
        } catch (error) {
          console.error('Error adding admin:', error);
        }
      };*/

    const handleAddAdmin = () => {
        setAddFormVisible(true);
        console.log('isAddFormVisible set to true');
    };

    const handleCancelAdd = () => {
        setAddFormVisible(false);
    };



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: </div>;
    }

    return (
        <>{isAddFormVisible && (
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
        )}
        <div className="w-[80%]  mx-auto flex md:justify-center max-md:w-[95%] mt-10 ">
            <div className=" w-full  max-md:overflow-x-scroll  " >
                <div className="w-full flex  mb-5 justify-between ">
                    <div className="w-[50%]  max-sm:hidden flex items-center shadow-sm">
                        <input
                            type="text"
                            placeholder="Search..."

                            className="border p-2 w-full"
                        />
                        <MagnifyingGlassIcon className="h-6 w-6 ml-2 text-gray-500 shadow-sm" />
                    </div>

                    <button onClick={() => handleAddAdmin()}
                        className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded flex items-center gap-3">
                        <FaPlus />
                        Add Admin
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
                        {admins.map((admin: Admin) => {

                            const classes = "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={admin.id} >
                                    <td className={classes}>
                                        <div className="font-normal">
                                            {admin.image}
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="font-normal">
                                            {admin.firstName + " " + admin.lastName}
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="font-normal">
                                            {admin.email}
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="font-normal">
                                            {admin.phone}
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="font-normal">
                                            {admin.address}
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="text-3xl flex justify-evenly"
                                        >
                                            <button className="text-red-700" onClick={() => handleDeleteClick(admin.id, admin.firstName, admin.lastName)}><MdDelete /></button>
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

export default AdminTable




