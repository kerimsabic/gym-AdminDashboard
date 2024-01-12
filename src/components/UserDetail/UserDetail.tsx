import { useMember } from '@/hooks/useMember';
import { StatusType } from '@/utils/types';
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';

type Props = {
    selectedUserId: string | null;
    closeUserDetail: (value: boolean) => void;
}

const UserDetail = ({ selectedUserId, closeUserDetail }: Props) => {

    const userData = useMember(selectedUserId)
    const [memberDetail, setMemberDetail] = useState(false);


    return (

        <>
            <div className='flex justify-center mt-16 mb-8 font-extrabold text-lg'>
                USER DETAILS
            </div>

            <div className="max-w-screen-md mx-auto mb-36 shadow-2xl p-4 rounded-lg bg-slate-100">
                <button onClick={() => closeUserDetail(false)} className='w-full flex justify-end text-4xl text-red-700'> <IoClose /></button>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                            {userData.data?.firstName}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                            {userData.data?.lastName}
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <div id="large-input" className=" text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                        {userData.data?.email}
                    </div>

                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                            {userData.data?.address}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                            {userData.data?.phone}
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trainer Name</label>
                    <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                        {userData.data?.trainerName}
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Training Plan</label>
                    <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                        {userData.data?.trainingPlanName}
                    </div>
                </div>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <div className={`mb-5 text-center block w-full p-4 text-gray-900 border rounded-lg sm:text-md focus:ring focus:border ${userData.data?.statusType === StatusType.ONLINE ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring dark:focus:border`}>
                        {userData.data?.statusType === StatusType.ONLINE ? 'Online' : 'Offline'}
                    </div>
                </div>
                

            </div>

        </>
    )
}

export default UserDetail