import { membersData } from "@/utils/data";
import { Member } from "@/utils/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Chip } from "@material-tailwind/react";
import React, { useState } from 'react'

import { MdDelete } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";

type Props = {}

const TABLE_HEAD = ["Image", "Name", "Email", "Status", "Training Plan", "Edit"];




const MembersTable = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState<Member[]>(membersData);

  const handleDelete = (name: string) => {
    const updatedMembers = members.filter(member => member.name !== name);
    setMembers(updatedMembers);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filteredMembers = membersData.filter(member =>
      member.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setMembers(filteredMembers);
  };
  return (

    <div className="w-[80%]  mx-auto flex md:justify-center max-md:w-[95%] mt-10 ">
      <div className=" w-full  max-md:overflow-x-scroll " >
        <div className="mb-4 w-full flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 w-full"
          />
          <MagnifyingGlassIcon className="h-6 w-6 ml-2 text-gray-500" />
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
                    className="font-normal leading-none opacity-70"                 >
                    {head}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map(({ img, name, email, status, plan }, index) => {
              const isLast = index === membersData.length - 1;
              const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black overflow-hidden">
                      <img src={img} alt={name} className="object-cover w-full h-full" />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="font-normal">
                      {name}
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="font-normal">
                      {email}
                    </div>
                  </td>
                  <td className={classes}>
                    <Chip
                      value={status ? "online" : "offline"}
                      className={status ? "text-green-500" : "text-red-500"}
                    />
                  </td>
                  <td className={classes}>
                    <div className="font-normal"
                    >
                      {plan}
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="text-3xl flex justify-between"
                    >
                      <button onClick={() => handleDelete(name)}><MdDelete /></button>
                      <button><MdOutlineManageAccounts /></button>

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

export default MembersTable