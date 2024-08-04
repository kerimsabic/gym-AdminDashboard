import { usePlans } from '@/hooks/planHooks';

import { useGetMemberIdQuery } from '@/store/memberSlice';
import { useGetMembershipMemberIdQuery } from '@/store/membershipSlice';
import { StatusType } from '@/utils/types';
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

type Props = {
    selectedUserId: string;
    closeMembershipDetail: (value: boolean) => void;
    onSubmitForm:(formData:MembershipForm)=>void;
}

export type MembershipForm = {
    userId: string;
    trainingPlanId: string;
    numOfMonths: number;
}


const MembershipDetail = ({ selectedUserId, closeMembershipDetail, onSubmitForm }: Props) => {
    const { data: member } = useGetMemberIdQuery(selectedUserId);
    const {data:membership}= useGetMembershipMemberIdQuery(selectedUserId);
    //const userData = useMember(selectedUserId)

    const planData = usePlans();
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');
    const [selectedNumber, setSelectedNumber] = useState<number>(1);
    const { handleSubmit} = useForm<MembershipForm>()

    const handleFormSubmit: SubmitHandler<MembershipForm> = () => {
        const formDataWithUserType: MembershipForm = {
           
            userId:selectedUserId,
            trainingPlanId: selectedPlanId,
            numOfMonths: selectedNumber,
        };
        try {
            onSubmitForm(formDataWithUserType);
           

        }
        catch (error) {
            console.error("Error updating member:", error);
        }
    };



    

    return (

        <>
            <div className='flex justify-center mt-16 mb-8 font-extrabold text-lg'>
                USER DETAILS
            </div>

            <div className="max-w-screen-md mx-auto mb-36 shadow-2xl p-4 rounded-lg bg-slate-100">
                <button onClick={() => closeMembershipDetail(false)} className='w-full flex justify-end text-4xl text-red-700'> <IoClose /></button>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                            {member?.firstName}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                            {member?.lastName}
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <div id="large-input" className=" text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                        {member?.email}
                    </div>

                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trainer Name</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                            {member?.trainerName}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Training Plan</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                            {member?.trainingPlanName}
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Memberhsip Start Date</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                        
                            {membership?.startDate ? new Date(membership.startDate).toLocaleDateString() : 'N/A'}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Memberhsip End Date</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                        {membership?.endDate ? new Date(membership.endDate).toLocaleDateString() : 'N/A'}
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <div className={`mb-5 text-center block w-full p-4 text-gray-900 border rounded-lg sm:text-md focus:ring focus:border ${membership?.statusType === StatusType.ONLINE ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring dark:focus:border`}>
                        {membership?.statusType === StatusType.ONLINE ? 'Online' : 'Offline'}
                    </div>
                </div>


            </div>

            <div className='w-auto md:h-[200px] mx-auto mb-10 shadow-2xl p-4 rounded-lg bg-slate-100'>
                <div className='flex justify-center mb-10 text-2xl'>UPDATE MEMBERSHIP</div>
                <div className='flex w-full pb-48 justify-center items-center'>
                    <form className='grid md:grid-cols-3 md:gap-8 max-md:grid-cols-3 max-sm:grid-cols-1 ' onSubmit={handleSubmit(handleFormSubmit)}>
                        {/* Training Plan Dropdown */}
                        <div className="relative mb-5 group pt-5">
                           
                            <select
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    //const result = planData.data?.find((x) => x.id === e.target.value);
                                    //console.log(result);
                                    setSelectedPlanId(selectedValue);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="" disabled selected>
                                    Select a Training Plan
                                </option>
                                {planData.data?.map((plan) => (
                                    <option
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        key={plan.id}
                                        value={plan.id}
                                    >
                                        {plan.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Number of Months Dropdown */}
                        
                        <div className="relative mb-5 group pt-5">
                           <p className='absolute top-0'>Months</p>
                            <select
                                onChange={(e) => {
                                    const selectedValue = parseInt(e.target.value, 10);
                                    console.log(selectedValue);
                                    setSelectedNumber(selectedValue);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                {[...Array(12).keys()].map((number) => (
                                    <option
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        key={number + 1}
                                        value={number + 1}
                                    >
                                        {number + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center items-center ">
                            <input
                                type="submit"
                                className="h-[40px] text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MembershipDetail