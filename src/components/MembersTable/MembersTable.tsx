import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Chip } from "@material-tailwind/react";
import React, { useState } from 'react'
import MemberModal from "../MemberModal"

import { MdDelete } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useMembers } from "@/hooks/useMembers";
import { useDeleteMember } from "@/hooks/useDeleteMember";
import { useMember } from "@/hooks/useMember";
import UserDetail from "../UserDetail";
import { FaRegEye } from "react-icons/fa";
import { Member, StatusType } from "@/utils/types";
import { useQueryClient } from "react-query";

type Props = {}

const TABLE_HEAD = ["Image", "Name", "Email", "Status", "Address", "Phone", "Edit"];

const MembersTable = (props: Props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);


  const membersData = useMembers();
  const deleteMember = useDeleteMember();

  const handleDeleteMember = (id: string) => {
    deleteMember.mutate(id);
  };

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const userData = useMember(selectedUserId)
  const [memberDetail, setMemberDetail] = useState(false);


  const [filteredMembers, setFilteredMembers] = useState<Member[] | null>(null);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filteredMembers = membersData.data?.filter(member =>
      member.firstName.toLowerCase().includes(event.target.value.toLowerCase())
      ||
      member.lastName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredMembers(filteredMembers!);
  };

  


  if (membersData.isLoading) {
    return <span>Data loading...</span>
  }
  if (membersData.isError) {
    return <span>Error getting the data</span>
  }



  return (
    <>

      {openModal && <MemberModal closeModal={setOpenModal} />}
      <div className="w-[80%]  mx-auto flex md:justify-center max-md:w-[95%] mt-10 ">
        <div className=" w-full  max-md:overflow-x-scroll " >
          <div className="w-full flex  mb-5 justify-between">
            <div className="w-[50%]  max-sm:hidden flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="border p-2 w-full"
              />
              <MagnifyingGlassIcon className="h-6 w-6 ml-2 text-gray-500" />
            </div>

            <button onClick={() => setOpenModal(!openModal)}
              className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded flex items-center gap-3">
              <FaPlus />
              Add Member
            </button>

          </div>


          <table className="w-full min-w-max table-auto  text-center">
            <thead className=''>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <div
                      className="font-normal leading-none opacity-70">
                      {head}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(filteredMembers || membersData.data)?.map(({ id, firstName, lastName, email, image, address, phone, statusType }, index) => {
                const isLast = index === membersData.data!.length - 1;
                const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id} >
                    <td className={classes}>
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black overflow-hidden">
                        <img src={image} alt={firstName} className="object-cover w-full h-full" />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="font-normal">
                        {firstName + " " + lastName}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="font-normal">
                        {email}
                      </div>
                    </td>
                    <td className={classes}>
                      <Chip
                         value={statusType === StatusType.ONLINE ? "Online" : "Offline"}
                         className={statusType === StatusType.ONLINE ? "text-green-500" : "text-red-500"}
                      />
                    </td>
                    <td className={classes}>
                      <div className="font-normal"
                      >
                        {address}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="font-normal"
                      >
                        {phone}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="text-3xl flex justify-between"
                      >
                        <button className="text-red-700"onClick={() => handleDeleteMember(id)}><MdDelete /></button>
                        <button className="text-blue-900" ><MdOutlineManageAccounts /></button>
                        <button className="text-green-900" onClick={() => { setSelectedUserId(id); setMemberDetail(true) }}><FaRegEye /></button>

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {memberDetail && <UserDetail selectedUserId={selectedUserId} closeUserDetail={setMemberDetail}/>}


    </>

  )
}

export default MembersTable