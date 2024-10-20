import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Member } from '@/utils/types';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddMemberImageMutation } from "@/store/memberSlice";
import { useTrainerQuery } from "@/store/trainersSlice";

const phoneRegExp: RegExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

// Validation schema
const schema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required('Email is required'),
    address: yup.string().required('Address is required'),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
    username: yup.string().required(),
    // password: yup.string().min(5, "Password must be at least 5 characters").notRequired(),
});

type MemberFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    password?: string; // Optional password
    username: string
};
type EditMemberFormProps = {
    onCancel: () => void;
    onUpdateMember: (formData: Member) => void;
    initialData: Member;
}


const EditMemberForm = ({ onCancel, onUpdateMember, initialData }: EditMemberFormProps) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<MemberFormValues>({
        resolver: yupResolver(schema),
    });

    const {data:trainers} = useTrainerQuery(undefined);
    //console.log(trainerData)
    const [selectedTrainerId, setSelectedTrainerId] = useState<string|null>(null);

    useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach((key) => {
                const validKey = key as keyof MemberFormValues;
                setValue(validKey, initialData[validKey]);
            });
        }
    }, [initialData, setValue]);

    const [addImage] = useAddMemberImageMutation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFormSubmit: SubmitHandler<MemberFormValues> = async (data: any) => {
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

        // Prepare form data with the image URL only if an image was uploaded
        const formDataWithImage = {
            ...data,
            trainerId:selectedTrainerId,
            ...(imageUrl ? { image: imageUrl } : {}), // Only include image if imageUrl is defined
        };

        // Update the user with the form data (including image URL if applicable)
        try {
            await onUpdateMember(formDataWithImage); // Assuming onUpdateMember sends the updated data
        } catch (error) {
            console.error('An unexpected error occurred while updating the member:', error);
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

                    <h1 className='pb-5 flex justify-center font-bold text-lg text-blue-600'>Edit Member</h1>

                    <form className="max-w-md mx-auto bg-[#ffffff]" onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("email")} />

                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            {errors.email && <small style={{ color: "red" }}>{errors.email.message}</small>}
                        </div>
                        {/*  <div className="relative z-0 w-full mb-5 group">
                            <input type="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("password")} />
                           
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            {errors.password && <small style={{ color: "red" }}>{errors.password.message}</small>}
                        </div>*/}

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("firstName")} />

                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                {errors.firstName && <small style={{ color: "red" }}>{errors.firstName.message}</small>}
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("lastName")} />

                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                {errors.lastName && <small style={{ color: "red" }}>{errors.lastName.message}</small>}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{3}|[0-9]{3}-[0-9]{3}-[0-9]{3}|[0-9]{3} [0-9]{3} [0-9]{3}" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("phone")} />

                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                                {errors.phone && <small style={{ color: "red" }}>{errors.phone.message}</small>}
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" id="floating_username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("username")} />

                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                                {errors.username && <small style={{ color: "red" }}>{errors.username.message}</small>}
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="address" id="floating_address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("address")} />

                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                            {errors.address && <small style={{ color: "red" }}>{errors.address.message}</small>}
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
                            <input type="file" accept="image/*" onChange={handleFileChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Upload Photo</label>
                        </div>

                        

                        <div className='flex justify-between'>
                            <button onClick={onCancel}
                                type="reset" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancel</button>
                            <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" /*disabled={createMember.isLoading} value={createMember.isLoading ? "Creating..." : "Submit"}*/ />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditMemberForm;