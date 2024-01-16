import { SubmitHandler, useForm } from "react-hook-form"
import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { FormMode, Member, StatusType, UserType } from '@/utils/types';
import { useUpdateMember } from '@/hooks/useUpdateMember';
import { useQueryClient } from 'react-query';
import usePlans from '@/hooks/planHooks/usePlans';
import useTrainers from '@/hooks/trainerHooks/useTrainers';



type Props = {
    onCancel: () => void;
    onSubmitMember: (formData: MemebrRegistrationForm) => void;
    onUpdateMember: (formData: Member) => void;
    initialData?: Member | null | undefined
}

export type MemebrRegistrationForm = {

    firstName: string;
    lastName: string;
    userType: UserType
    email: string;
    userName: string;
    image?: string;
    qrCode: string;
    trainerEmail: string;
    TrainerImage: string;
    trainerName: string;
    trainerId: string;
    trainerUserType: UserType.TRAINER;   //ovo mozda samo treba UserType pa poslije staviti trener
    address: string;
    phone: string;
    statusType: StatusType
    password: string
    trainingPlanName: string;
    trainingPlanId: string

}

const MemberForm = ({ onCancel, onSubmitMember, onUpdateMember, initialData }: Props) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<MemebrRegistrationForm>({
        //resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach((key) => {
                const validKey = key as keyof MemebrRegistrationForm;
                setValue(validKey, initialData[validKey]);
            });
            
        }
    }, [initialData, setValue]);


    const handleFormSubmit: SubmitHandler<MemebrRegistrationForm> = (data) => {
        const formDataWithUserType = {
            ...data,
            userType: UserType.MEMBER,
            trainingPlanId:selectedPlanId,
            trainerId:selectedTrainerId,

            
        };
        /* console.log(formDataWithUserType);
         console.log("helo")*/
        try {
            if (initialData && !data.password) {
                // Set the existing password
                formDataWithUserType.password = initialData.password;
            }
            if (initialData) {
                const updatedMember = { ...initialData, ...formDataWithUserType };
                updatedMember.password = formDataWithUserType.password || initialData.password;
                setSelectedPlanId(updatedMember.trainingPlanId);
                setSelectedTrainerId(updatedMember.trainerId);
                onUpdateMember(updatedMember);
            }
            else {
                onSubmitMember(formDataWithUserType);
            }
        }
        catch (error) {
            console.error("Error updating member:", error);
        }
    };





    const planData = usePlans();
    const [selectedPlanId, setSelectedPlanId] = useState<string>();

    const trainerData = useTrainers();
    //console.log(trainerData)
    const [selectedTrainerId, setSelectedTrainerId] = useState<string>();


    /* const createMember = useCreateMember();
     const handleCreateMemberSubmit: SubmitHandler<Member> = (data) => {
         data.trainingPlanId = selectedPlanId;
         data.trainerId = selectedTrainerId;
         createMember.mutate(data);
     };*/

    //const { register, handleSubmit } = useForm<Member>();

    /* const updateMember = useUpdateMember();
     const handleUpdateMemberSubmit: SubmitHandler<Member> = (data) => {
         updateMember.mutate({ ...data });
     }*/


    /* if (createMember.isSuccess) {
         const queryClinet = useQueryClient()
 
         queryClinet.invalidateQueries({ queryKey: ["members"] })
 
         closeModal(false);
 
     }*/




    return (
        <>
            <div className="fixed bottom-0 max-sm:top-[10px] left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-30 overflow-x-auto">
                <div className="bg-white p-12 rounded shadow-lg w-full max-w-lg overflow-x-auto z-30 h-[80%]">
                    <div className="flex justify-end">
                        <button onClick={onCancel}>
                            <div className="text-black text-3xl">
                                <IoClose />
                            </div>
                        </button>
                    </div>

                    <h1 className='pb-5 flex justify-center font-bold text-lg text-blue-600'>Member Form</h1>

                    <form className="max-w-md mx-auto bg-[#ffffff]" onSubmit={handleSubmit(handleFormSubmit)}>
                        <div></div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register("email")} />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register("password")} />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register("password")} />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register("firstName")} />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register("lastName")} />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{3}|[0-9]{3}-[0-9]{3}-[0-9]{3}|[0-9]{3} [0-9]{3} [0-9]{3}" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register("phone")} />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" id="floating_username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register("userName")} />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="address" id="floating_address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register("address")} />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group pt-5">
                            <label className="pb-5 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Training Plan</label>
                            <select onChange={(e) => {
                                const result = planData.data?.find((x) => x.id === e.target.value);
                                console.log(result)
                                setSelectedPlanId(result!.id)


                            }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="" disabled selected>
                                    Select a Training Plan
                                </option>
                                {planData.data?.map((plan) => {
                                    return <option className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" key={plan.id} value={plan.id}>{plan.name} </option>
                                })}
                            </select>
                        </div>

                        <div className="relative z-0 w-full mb-5 group pt-5">
                            <label className="pb-5 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Trainer</label>
                            <select onChange={(e) => {
                                const result = trainerData.data?.find((trainer) => trainer.id === e.target.value);
                                console.log(result)

                                setSelectedTrainerId(result!.id)


                            }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="" disabled selected>
                                    Select a Trainer
                                </option>
                                {trainerData.data?.map((trainer) => {
                                    return <option className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" key={trainer.id} value={trainer.id}>{trainer.firstName + " " + trainer.lastName} </option>
                                })}
                            </select>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Image</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is optional</div>
                        </div>

                        <div className='flex justify-between'>
                            <button onClick={onCancel}
                                type="reset" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancle</button>
                            <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" /*disabled={createMember.isLoading} value={createMember.isLoading ? "Creating..." : "Submit"}*/ />

                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default MemberForm