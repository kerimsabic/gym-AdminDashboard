import { SubmitHandler, useForm } from "react-hook-form"
import  { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import {  Member, StatusType, UserType } from '@/utils/types';
import usePlans from '@/hooks/planHooks/usePlans';


import { useTrainerQuery } from "@/store/trainersSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useAddMemberImageMutation } from "@/store/memberSlice";




type Props = {
    onCancel: () => void;
    onSubmitMember: (formData: MemebrRegistrationForm) => void;
    onUpdateMember: (formData: Member) => void;
    initialData?: Member | null | undefined
}

export type MemebrRegistrationForm = {

    firstName: string;
    lastName: string;
    //userType: UserType
    email: string;
    username: string;
   // image?: string;
    qrCode?: string|null;
    //trainerId?: string|null;
    //trainerUserType?: undefined;   //ovo mozda samo treba UserType pa poslije staviti trener
    address: string;
    phone: string;
    statusType?: StatusType
    password: string;
   // trainingPlanId?: string;
    numOfMonths?:number|undefined;

}
const phoneRegExp: RegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    //userType: yup.string().required(),
    email: yup.string().email().required('Email is required'),
    username: yup.string().required('Username is required'),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
    password: yup.string().min(5).required(),
    address: yup.string().required(),
    //image:yup.string().optional(),



})

const MemberForm = ({ onCancel, onSubmitMember, onUpdateMember, initialData }: Props) => {

    const { register, handleSubmit,  setValue, formState: { errors } } = useForm<MemebrRegistrationForm>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach((key) => {
                const validKey = key as keyof MemebrRegistrationForm;
                setValue(validKey, initialData[validKey]);
            });
            setSelectedPlanId(initialData.trainingPlanId || '');
        }
    }, [initialData, setValue]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    const [addImage] = useAddMemberImageMutation();
  
    const handleFileChange = (e : any) => {
      setSelectedFile(e.target.files[0]);
    };


    const handleFormSubmit: SubmitHandler<MemebrRegistrationForm> = async (data) => {

        let imageUrl: string | undefined = undefined;

        try {
          const result = await addImage(selectedFile);
        
          if ('data' in result) {
           
            imageUrl = result.data.url;
            console.log('Image URL:', imageUrl);
          } else {
          
            console.error('Error fetching image URL:', result.error);
          }
        } catch (error) {
          console.error('An unexpected error occurred while uploading the image:', error);
        }

        const formDataWithUserType = {
            ...data,
            userType: UserType.MEMBER,
            statusType:StatusType.OFFLINE,
            trainingPlanId:selectedPlanId,
            trainerId:selectedTrainerId,
            numOfMonths:selectedNumber, 
            image: imageUrl
        };
        try {
            if (initialData && !data.password) {
                formDataWithUserType.password = initialData.password;
            }
            if (initialData) {
                const updatedMember = {  ...formDataWithUserType };
                updatedMember.password = formDataWithUserType.password || initialData.password;
                setSelectedPlanId(updatedMember.trainingPlanId);
              //  setSelectedTrainerId(updatedMember.trainerId);
              console
                console.log(updatedMember)
                onUpdateMember(updatedMember);       //mogu stavit '?'
            }
            else {
                onSubmitMember(formDataWithUserType);
                console.log(formDataWithUserType);
            }
        }
        catch (error) {
            console.error("Error updating member:", error);
        }
    };





    const planData = usePlans();
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');
    const[selectedNumber, setSelectedNumber]=useState<number>(1);

    const {data:trainers} = useTrainerQuery(undefined);
    //console.log(trainerData)
    const [selectedTrainerId, setSelectedTrainerId] = useState<string|null>(null);


    return (
        <>
            <div className="fixed bottom-0 max-sm:top-10 max-sm:mt-[-50px] left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-30 overflow-x-auto">
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
                            <input type="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("email")} />
                            {errors.email && <small style={{ color: "red" }}>{errors.email.message}</small>}
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("password", { required: !!initialData })} />
                            {errors.password && <small style={{ color: "red" }}>{errors.password.message}</small>}
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("firstName")} />
                                {errors.firstName && <small style={{ color: "red" }}>{errors.firstName.message}</small>}
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("lastName")} />
                                {errors.lastName && <small style={{ color: "red" }}>{errors.lastName.message}</small>}
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{3}|[0-9]{3}-[0-9]{3}-[0-9]{3}|[0-9]{3} [0-9]{3} [0-9]{3}" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("phone")} />
                                {errors.phone && <small style={{ color: "red" }}>{errors.phone.message}</small>}
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" id="floating_username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("username")} />
                                {errors.username && <small style={{ color: "red" }}>{errors.username.message}</small>}
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="address" id="floating_address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("address")} />
                            {errors.address && <small style={{ color: "red" }}>{errors.address.message}</small>}
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group pt-5">
                            <label className="pb-5 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Training Plan</label>
                            <select  onChange={(e) => {
                                 const selectedValue = e.target.value;
                                setSelectedPlanId(selectedValue)
                               

                            }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                <option value="" disabled selected>
                                    Select a Training Plan
                                </option>
                                {planData.data?.map((plan) => {
                                    return <option className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" key={plan.id} value={plan.id}>{plan.name}  </option>
                                })}
                            </select>
                        </div>

                         <div className="relative z-0 w-full mb-5 group pt-5">
                            <label className="pb-5 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of Months</label>
                            <select onChange={(e) => {
                                const selectedValue = parseInt(e.target.value, 10);
                                console.log(selectedValue);
                                setSelectedNumber(selectedValue);
                            }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                
                                {[...Array(12).keys()].map((number) => {
                                    return <option className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    key={number+1} value={number+1}>{number+1} </option>
                                })}
                            </select>
                        </div>

                        <div className="relative z-0 w-full mb-5 group pt-5">
                            <label className="pb-5 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Trainer</label>
                            <select onChange={(e) => {
                                const result = trainers?.find((trainer) => trainer.id === e.target.value);
                                if(result){
                                    setSelectedTrainerId(result.id!)
                                }
                                else{
                                    setSelectedTrainerId(null)
                                }
                                
                            }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="" disabled selected>
                                    Select a Trainer
                                </option>
                                {trainers?.map((trainer) => {
                                    return <option className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    key={trainer.id} value={trainer.id}>{trainer.firstName + " " + trainer.lastName} 
                                    </option>
                                })}
                            </select>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                           {/*  <input type="file" ref={fileInputRef} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />*/}
                           <input type="file" accept="image/*" onChange={handleFileChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Upload Photo</label>
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