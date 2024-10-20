import { useGetAdminsQuery, useDeleteAdminMutation, useUpdateAdminMutation } from '@/store/adminSlice';
import { Admin } from '@/utils/types';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdDelete, MdOutlineManageAccounts } from 'react-icons/md';
import AdminsForm from '../AdminsForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, selectSearch } from '@/store';
import { setSearch } from '@/store/trainersSlice';
import { registerAdmin } from '@/store/authSlice';






const TABLE_HEAD = ["Image", "Name", "Email", "Phone", "Address", "Actions"];

const AdminTable = () => {

    const { data: admins, error, isLoading, refetch } = useGetAdminsQuery();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4;
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;

    const totalPages = admins ? Math.floor(admins.length / pageSize) : 0;

    const handleNextPage = () => {
        if (admins) {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(admins.length / pageSize)));
        }
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };


    const search = useSelector(selectSearch);
    const dispatch2 = useDispatch();
    const [deleteAdmin] = useDeleteAdminMutation();
    //const [addAdmin] = useAddAdminMutation();
    const [updateAdmin] = useUpdateAdminMutation();

    //const [page, setPage] = useState(1)

    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const handleCancelAdd = () => { setAddFormVisible(false); };

    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

    const handleEditAdmin = (admin: Admin) => {
        setSelectedAdmin(admin);
        setAddFormVisible(true);
    };


    const handleDeleteClick = async (id: string, firstName: string, lastName: string) => {
        try {
            if (window.confirm(`Are you sure you want to delete this ADMIN:   "${firstName.toUpperCase() + " " + lastName.toUpperCase()}"`)) {
                await deleteAdmin({ id: id })
            }
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };


    /*const filteredAdmins = useMemo(() => (
        (admins || []).filter((admin: Admin) => admin.firstName.toLowerCase().includes(search.toLowerCase()) || admin.lastName.toLowerCase().includes(search.toLowerCase()))
    ), [admins, search])*/






    const { } = useSelector(
        (state: RootState) => state.auth
    )
    const dispatch = useDispatch<AppDispatch>()






    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: </div>;
    }

    return (
        <>
            {isAddFormVisible && (
                <AdminsForm
                    onCancel={handleCancelAdd}
                    onSubmitAdmin={async (formData) => {
                        try {
                            await dispatch(registerAdmin(formData))
                            refetch()
                        } catch (error) {
                            console.log(error)
                        }
                        setAddFormVisible(false);
                    }}

                    initialData={selectedAdmin}
                    onUpdateAdmin={async (formData) => {
                        console.log(formData.id)
                        try {
                            await updateAdmin({ id: formData.id, data: formData })
                        } catch (error) {
                            console.log(error)
                        }
                        setAddFormVisible(false);
                    }}
                />
            )}
            <div className="w-[80%]  mx-auto flex md:justify-center max-md:w-[95%] mt-10 ">
                <div className=" w-full  max-md:overflow-x-scroll  " >
                    <div className="w-full flex max-xs:flex-col mb-5 justify-between ">
                        <div className="w-[50%]   flex items-center shadow-sm">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(event) => {
                                    dispatch2(setSearch(event?.target.value))
                                }}
                                className="border p-2 w-full"
                            />
                            <MagnifyingGlassIcon className="h-6 w-6 ml-2 text-gray-500 shadow-sm" />
                        </div>

                        <button onClick={() => { setAddFormVisible(true); setSelectedAdmin(null) }}
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
                            {(admins || []).filter((admin: Admin) =>
                                admin.firstName.toLowerCase().includes(search.toLowerCase()) ||
                                admin.lastName.toLowerCase().includes(search.toLowerCase())
                            ).slice(startIndex, endIndex).map((admin: Admin) => {

                                const classes = "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={admin.id} >
                                        <td className={classes}>
                                            <img
                                                src={admin.image}
                                                alt={admin.firstName}
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='black'/%3E%3C/svg%3E";
                                                }}
                                                className="w-[50px] h-[50px] rounded-full"
                                            />
                                            
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
                                                <button className="text-red-700" onClick={() => handleDeleteClick(admin.id!, admin.firstName, admin.lastName)}><MdDelete /></button>
                                                <button className="text-blue-900" onClick={() => { handleEditAdmin(admin) }}><MdOutlineManageAccounts /></button>


                                            </div>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="w-[80%] mx-auto flex justify-between mt-4">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 0}
                            className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded"
                        >
                            Previous Page
                        </button>
                        <div>{currentPage}...{totalPages}</div>
                        <button
                            onClick={handleNextPage}
                            disabled={!admins || endIndex >= admins.length}
                            className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded"
                        >
                            Next Page
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AdminTable




