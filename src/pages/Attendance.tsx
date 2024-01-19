import { selectSearch } from '@/store';
import { useGetMembersQuery } from '@/store/memberSlice';
import { setSearch } from '@/store/trainersSlice';
import { Member, StatusType } from '@/utils/types';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Chip } from '@material-tailwind/react';
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCalendarPlus } from "react-icons/fa";
import { useAddAttendanceMutation } from '@/store/attendanceSlice';

type Props = {}

const TABLE_HEAD = ["Image", "Name", "Email", "Status", "Attendace"];

const Attendance = (props: Props) => {

    const { data, /*isLoading, isError,*/ refetch } = useGetMembersQuery(undefined);
    const search = useSelector(selectSearch);
    const dispatch = useDispatch();
    const [markAttendace, isSuccess] = useAddAttendanceMutation();

    const handleMarkAttendance = async (member: Member) => {
        try {
            const result = window.confirm(
                `Are you sure you want to mark attendance for this MEMBER: "${member.firstName.toUpperCase()} ${member.lastName.toUpperCase()}"`
            );
            if (result) {
                const data = {
                    memberId: member.id!
                };
                await markAttendace(data);
                if (isSuccess) {
                    window.confirm("Attendance successfully added")
                }
                await refetch();              //refetc da bi refresovali tabelu da bi se vidjelo online ili oflline
            }
        } catch (error) {
            console.error('Error marking attendance:', error);
        }
    };


    const filteredMembers = useMemo(() => (
        (data || []).filter((member) => member.firstName.toLowerCase().includes(search.toLowerCase()) || member.lastName.toLowerCase().includes(search.toLowerCase()))
    ), [data, search])

    return (
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
                        {(filteredMembers)?.map((member, index) => {
                            const isLast = index === data!.length - 1;
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
                                            <button className="text-green-700 " onClick={() => { handleMarkAttendance(member) }}><FaRegCalendarPlus />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Attendance