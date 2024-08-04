import { selectSearch } from '@/store';
import { useGetMembersQuery } from '@/store/memberSlice';
import { setSearch } from '@/store/trainersSlice';
import { Member, StatusType } from '@/utils/types';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Chip } from '@material-tailwind/react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCalendarPlus } from "react-icons/fa";
import { useAddAttendanceMutation } from '@/store/attendanceSlice';



const TABLE_HEAD = ["Image", "Name", "Email", "Status", "Attendace"];

const Attendance = () => {

    //const { data, /*isLoading, isError,*/ refetch } = useGetMembersQuery(undefined);
    const { data: members, refetch } = useGetMembersQuery(undefined);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 6;
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;

    const totalPages = members ? Math.floor(members.length / pageSize) : 0;

    const handleNextPage = () => {
        if (members) {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(members.length / pageSize)));
        }
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const search = useSelector(selectSearch);
    const dispatch = useDispatch();
    const [markAttendance] = useAddAttendanceMutation();

    const handleMarkAttendance = async (member: Member) => {
        try {
            const result = window.confirm(
                `Are you sure you want to mark attendance for this MEMBER: "${member.firstName.toUpperCase()} ${member.lastName.toUpperCase()}"`
            );
    
            if (result) {
                const data = {
                    memberId: member.id!
                };

                await markAttendance(data).unwrap();

                window.alert("Attendance successfully added");
                await refetch(); 
            }
        } catch (error: any) {
            console.error('Error marking attendance:', error);
    
            if (error?.status === 404 && error?.data?.message === 'Membership expired') {
                window.alert("Attendance cannot be marked because the membership has expired.");
            } else {
                window.alert("An unexpected error occurred while marking attendance.");
            }
        }
    };



    return (
        <>
        <div className='flex justify-center'>Attendance</div>
        <div className="w-[80%] mx-auto flex md:justify-center max-md:w-[95%] mt-10">
            <div className=" w-full  max-md:overflow-x-scroll lg:overflow-x-scroll " >
                <div className="w-full flex  mb-5 justify-between">
                    <div className="w-[50%]  max-sm:hidden flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(event) => {
                                dispatch(setSearch(event.target.value))
                            }}
                            className="border p-2 w-full"
                        />
                        <MagnifyingGlassIcon className="h-6 w-6 ml-2 text-gray-500" />
                    </div>
                </div>


                <table className="w-full min-w-max table-auto text-center shadow-2xl  rounded-lg">
                    <thead className=''>
                        <tr className='bg-[#191d4f]'>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <div
                                        className=" leading-none opacity-70 font-bold text-white">
                                        {head}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(members || []).filter((member) =>
                            member.firstName.toLowerCase().includes(search.toLowerCase()) ||
                            member.lastName.toLowerCase().includes(search.toLowerCase())
                        ).slice(startIndex, endIndex).map((member, index) => {
                            const isLast = index === members!.length - 1;
                            const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={member.id} >
                                    <td className={classes}>
                                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black overflow-hidden">
                                            <img src={member.image} alt={member.firstName} className="object-cover w-full h-full" />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="font-normal">
                                            {member.firstName + " " + member.lastName}
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="font-normal">
                                            {member.email}
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Chip
                                            value={member.statusType === StatusType.ONLINE ? "Online" : "Offline"}
                                            className={member.statusType === StatusType.ONLINE ? "text-green-500" : "text-red-500"}
                                        />
                                    </td>
                                    <td className={classes}>
                                        <div className="text-3xl flex justify-center gap-2"
                                        >
                                            <button className="text-green-700 hover:text-blue-400 " onClick={() => { handleMarkAttendance(member) }}><FaRegCalendarPlus />
                                                <span className='text-sm'>Attend</span>
                                            </button>
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
                        disabled={!members || endIndex >= members.length}
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

export default Attendance