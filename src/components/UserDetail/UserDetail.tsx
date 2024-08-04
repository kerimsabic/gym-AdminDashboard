import { useState } from 'react';
import { useGetMemberIdQuery, useUpdateMemberPasswordMutation } from '@/store/memberSlice';
import { StatusType } from '@/utils/types';
import { IoClose } from 'react-icons/io5';
import { useForm, SubmitHandler } from 'react-hook-form';

type Props = {
    selectedUserId: string;
    closeUserDetail: (value: boolean) => void;
};

type PasswordResetFormValues = {
    password: string;
    repeatedPassword: string;
};

const UserDetail = ({ selectedUserId, closeUserDetail }: Props) => {
    const { data: member } = useGetMemberIdQuery(selectedUserId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatePassword] = useUpdateMemberPasswordMutation();


    // Modal logic
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Password reset form logic
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<PasswordResetFormValues>();
    const id = member?.id
    const handlePasswordReset: SubmitHandler<PasswordResetFormValues> = async (data) => {
       // console.log(data);
        try {
            // Replace this with your actual API call
            const response = await updatePassword({ id: id, data: data });

            if (response) {
                window.alert("Successfully updated password");
               closeModal();
            } else {
                window.alert("Failed to update password");
            }
        } catch (error: any) {
            console.error("Error updating password:", error);

            if (error.response) {
                window.alert("Failed to update password: " + error.response.data.message);
            } else {
                window.alert("Failed to update password: " + error.message);
            }
        } 
        closeModal(); // Close the modal after submission
    };

    return (
        <>
            <div className='flex justify-center mt-16 mb-8 font-extrabold text-lg'>
                USER DETAILS
            </div>

            <div className="max-w-screen-md mx-auto mb-36 shadow-2xl p-4 rounded-lg bg-slate-100">
                <button onClick={() => closeUserDetail(false)} className='w-full flex justify-end text-4xl text-red-700'>
                    <IoClose />
                </button>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {member?.firstName}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {member?.lastName}
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {member?.email}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {member?.address}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {member?.phone}
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trainer Name</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {member?.trainerName}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Training Plan</label>
                        <div id="large-input" className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {member?.trainingPlanName}
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <div className={`mb-5 text-center block w-full p-4 text-gray-900 border rounded-lg sm:text-md focus:ring focus:border ${member?.statusType === StatusType.ONLINE ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring dark:focus:border`}>
                        {member?.statusType === StatusType.ONLINE ? 'Online' : 'Offline'}
                    </div>
                </div>
                
                <button onClick={openModal} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Reset Password
                </button>

                {/* Password Reset Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto relative">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Reset Password</h2>
                            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-900">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <form onSubmit={handleSubmit(handlePasswordReset)} className="mt-4">
                                
                                <div className="mb-5">
                                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        {...register('password', { required: 'New password is required' })}
                                        className="block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    />
                                    {errors.password && <small className="text-red-500">{errors.password.message}</small>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        {...register('repeatedPassword', { 
                                            required: 'Please confirm your new password',
                                            validate: (value) => value === getValues('repeatedPassword') || 'Passwords do not match'
                                        })}
                                        className="block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    />
                                    {errors.repeatedPassword && <small className="text-red-500">{errors.repeatedPassword.message}</small>}
                                </div>
                                <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserDetail;
