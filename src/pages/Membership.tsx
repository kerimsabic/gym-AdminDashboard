import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Chip } from "@material-tailwind/react";
import { useState } from 'react'
import { MdOutlineManageAccounts } from "react-icons/md";
import { StatusType } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch } from "@/store";
import { setSearch } from "@/store/trainersSlice";
import { useGetMembershipsQuery } from "@/store/membershipSlice";
import MembershipDetail from "@/components/MembershipDetail";
import { useUpdateMemberMembershipSpecialMutation } from "@/store/memberSlice";
import { MembershipForm } from "@/components/MembershipDetail/MembershipDetail";

const TABLE_HEAD = ["Name", "Email", "Plan", "Status", "Edit"];


const Membership = () => {

    const { data: memberships, isLoading, isError, refetch } = useGetMembershipsQuery(undefined);

    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5;
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;

    const totalPages = memberships ? Math.floor(memberships.length / pageSize) : 0;

    const handleNextPage = () => {
        if (memberships) {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(memberships.length / pageSize)));
        }
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };




    const search = useSelector(selectSearch);
    const dispatch = useDispatch();
    const [updateMembership, isSuccess] = useUpdateMemberMembershipSpecialMutation();

    /*const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [membershipDetail, setMembershipDetail] = useState(false);*/
    const [selectedUserId, setSelectedUserId] = useState<string | null>('');
    const [, setSelectedMembership] = useState<string>('')
    const [memberDetail, setMemberDetail] = useState(false);







    /*const filteredMembers = useMemo(() => (
      (members || []).filter((member) => member.firstName.toLowerCase().includes(search.toLowerCase()) || member.lastName.toLowerCase().includes(search.toLowerCase()))
    ), [members, search])*/


    //const userData = useMember(selectedUserId)  hook no longer






    if (isLoading) {
        return <span>Data loading...</span>
    }
    if (isError) {
        return <span>Error getting the data</span>
    }



    return (
        <>

            <div className='flex justify-center'>Memberships</div>
            <div className="w-[80%] mx-auto flex md:justify-center max-md:w-[95%] mt-10">
                <div className=" w-full  max-md:overflow-x-scroll lg:overflow-x-scroll " >
                    <div className="w-full flex max-xs:flex-col mb-5 justify-between">
                        <div className="w-[50%]   flex items-center">
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
                            {(memberships || []).filter((membership) =>
                                membership.memberName.toLowerCase().includes(search.toLowerCase())

                            ).slice(startIndex, endIndex).map((membership, index) => {
                                const isLast = index === memberships!.length - 1;
                                const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={membership.id} >
                                        <td className={classes}>
                                            <div className="font-normal">
                                                {membership.memberName}
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="font-normal">
                                                {membership.memberEmail}
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="font-normal">
                                                {membership.trainingPlanName}
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Chip
                                                value={membership.statusType === StatusType.ONLINE ? "Online" : "Offline"}
                                                className={membership.statusType === StatusType.ONLINE ? "text-green-500" : "text-red-500"}
                                            />
                                        </td>


                                        <td className={classes}>
                                            <div className="text-3xl flex justify-center ">
                                                <button className="text-blue-900 hover:text-blue-400" onClick={() => { setSelectedUserId(membership.memberId); setSelectedMembership(membership.id); setMemberDetail(true) }}><MdOutlineManageAccounts />
                                                    <span className="text-sm">Edit </span>
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
                            disabled={!memberships || endIndex >= memberships.length}
                            className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded"
                        >
                            Next Page
                        </button>
                    </div>
                </div>
            </div>

            {memberDetail && (
                <MembershipDetail
                    selectedUserId={selectedUserId!}
                    closeMembershipDetail={setMemberDetail}
                    onSubmitForm={async (formData: MembershipForm) => {
                        try {
                            console.log(formData);
                            await updateMembership({ id: formData.userId, data: formData });
                            if (isSuccess) {
                                window.confirm("Successfully updated memberhsip")
                                refetch();
                                window.location.reload();
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                />
            )}


        </>

    )
}

export default Membership