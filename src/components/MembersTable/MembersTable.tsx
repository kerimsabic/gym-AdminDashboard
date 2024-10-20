import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Chip } from "@material-tailwind/react";
import { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import UserDetail from "../UserDetail";
import { FaRegEye } from "react-icons/fa";
import { Member, StatusType } from "@/utils/types";
import MemberForm from "../MemberForm";
import EditMemberForm from "../MemberForm/MemberEditForm";
import { useAddMemberMutation, useDeleteMemberMutation, useGetMembersQuery, useUpdateMemberMutation } from "@/store/memberSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch } from "@/store";
import { setSearch } from "@/store/trainersSlice";




const TABLE_HEAD = ["Image", "Name", "Email", "Status", "Phone", "Edit"];

const MembersTable = () => {




  const { data: members, isLoading, isError, isSuccess } = useGetMembersQuery(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
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
  const [deleteMember] = useDeleteMemberMutation();
  const [addMember] = useAddMemberMutation();
  const [updateMember] = useUpdateMemberMutation();

  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const handleCancelAdd = () => { setAddFormVisible(false); setIsEditFormVisible(false) };
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const [selectedMember, setSelectedMember] = useState<Member | null | any>(null);

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setIsEditFormVisible(true);
  };


  const handleDeleteClick = async (id: string, firstName: string, lastName: string) => {
    try {
      if (window.confirm(`Are you sure you want to delete this MEMBER:   "${firstName.toUpperCase() + " " + lastName.toUpperCase()}"`)) {
        await deleteMember({ id: id })
        if (isSuccess) {
          window.confirm("Member successfully deleted")
        }
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };






  const [selectedUserId, setSelectedUserId] = useState<string | null>('');
  //const userData = useMember(selectedUserId)  hook no longer
  const [memberDetail, setMemberDetail] = useState(false);





  if (isLoading) {
    return <span>Data loading...</span>
  }
  if (isError) {
    return <span>Error getting the data</span>
  }



  return (
    <>
      {isAddFormVisible && (
        <MemberForm
          onCancel={handleCancelAdd}
          onSubmitMember={async (formData: any) => {
            try {
              if (formData.trainingPlanId == "") {
                alert("Training plan not selected, member NOT created");
              }
              else {
                await addMember(formData)
                if (isSuccess) {
                  window.confirm("Member successfully added")
                }
              }

            } catch (error) {
              console.log(error)
            }
            setAddFormVisible(false);
          }}

          initialData={selectedMember}
          onUpdateMember={async (formData) => {
            console.log(formData.id)
            try {
              await updateMember({ id: formData.id, data: formData })
              if (isSuccess) {
                window.confirm(`Member ${formData.firstName} successfully updated`)
              }
            } catch (error) {
              console.log(error)
            }
            setAddFormVisible(false);
          }}
        />
      )}

      {isEditFormVisible && (
        <EditMemberForm
          onCancel={handleCancelAdd}
          initialData={selectedMember}
          onUpdateMember={async (formData) => {
            console.log(formData.id)
            try {
              await updateMember({ id: formData.id, data: formData })
              if (isSuccess) {
                window.confirm(`Member ${formData.firstName} successfully updated`)
              }
            } catch (error) {
              console.log(error)
            }
            setIsEditFormVisible(false);
          }}
        />
      )}

      <div className="w-[100%] mx-auto flex md:justify-center max-md:w-[95%] mt-10">
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

            <button onClick={() => { setAddFormVisible(true); setSelectedMember(null) }}
              className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded flex items-center gap-3">
              <FaPlus />
              Add Member
            </button>

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
                      <div className="rounded-xl">
                        <img

                          src={member.image}
                          alt={member.firstName}
                          className="object-cover w-[80px] h-[80px] rounded-full m-auto"
                        />
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
                      <div className="font-normal"
                      >
                        {member.phone}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="text-3xl flex justify-between gap-2"
                      >
                        <button className="text-red-700" onClick={() => handleDeleteClick(member.id!, member.firstName, member.lastName)}><MdDelete /></button>
                        <button className="text-blue-900" onClick={() => handleEditMember(member)}><MdOutlineManageAccounts /></button>
                        <button className="text-green-900" onClick={() => { setSelectedUserId(member.id!); setMemberDetail(true) }}><FaRegEye /></button>

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
              <span>Previous Page</span>
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

      {memberDetail && <UserDetail selectedUserId={selectedUserId!} closeUserDetail={setMemberDetail} />}


    </>

  )
}

export default MembersTable