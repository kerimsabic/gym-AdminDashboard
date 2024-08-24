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
    onSubmitEquipment: (formData: AddEquipmentForm) => void;
   
  
}

export type AddEquipmentForm = {

    name: string| any,
    type: string| any,
    manufacturer: string | any,
    image? : string| any

}



const EquipmentForm = ({ onCancel, onSubmitEquipment }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddEquipmentForm>({
      
    });

    

    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    const [addImage] = useAddMemberImageMutation();
  
    const handleFileChange = (e : any) => {
      setSelectedFile(e.target.files[0]);
    };


    const handleFormSubmit: SubmitHandler<AddEquipmentForm> = async (data) => {

        let imageUrl: string | undefined = undefined;
        try {
            // Check if a file is selected
            if (selectedFile) {
                // Attempt to upload the image and handle the result
                const result: any = await addImage(selectedFile).unwrap(); // Use unwrap to handle errors

                // Check if result is an object with data
                if ('error' in result) {
                    console.error('An unexpected error occurred while uploading the image:', result.error);
                } else {
                    // Assuming result is the URL as a string
                    imageUrl = result.imageUrl; // Store the URL
                    console.log('Image URL:', imageUrl);
                }
            }
        } catch (error: any) {
            console.error('An unexpected error occurred while uploading the image:', error);

        }

        const formDataWithUserType = {
            ...data,
            userType: UserType.MEMBER,
            statusType:StatusType.OFFLINE,
          
            image: imageUrl
        };
        try {
           
            
                onSubmitEquipment(formDataWithUserType);
                console.log(formDataWithUserType);
            
        }
        catch (error) {
            console.error("Error updating member:", error);
        }
    };



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
                            <input type="text" id="equipmentName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("name")} />
                            
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="equipmentManufacturer" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("type")} />
                           
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Manufacturer</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="equipmentType" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("manufacturer")} />
                           
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>
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

export default EquipmentForm