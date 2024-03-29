import { Admin, StatusType, UserType } from '@/utils/types';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm, SubmitHandler } from 'react-hook-form';

import * as yup from 'yup';
import { IoClose } from 'react-icons/io5';
import { useEffect } from 'react';


type Props = {
    onCancel: () => void;
    onSubmitAdmin: (formData: AdminsRegistrationForm) => void;
    onUpdateAdmin:(formData:Admin)=>void;
    initialData?:Admin|null|undefined
}

export type AdminsRegistrationForm = {
    firstName: string;
    lastName: string;
    //userType: UserType
    email: string;
    username: string;
   // image?: string;
    address: string;
    phone: string;
    password: string
}
const phoneRegExp: RegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    //userType: yup.string().oneOf(["ADMIN"], "User Type ADMIN"),
    email: yup.string().email().required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().min(6).required(),
    address: yup.string().required(),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
   // image:yup.string().optional()

}).required()

const AdminsForm = ({ onCancel, onSubmitAdmin,onUpdateAdmin,initialData }: Props) => {
   

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<AdminsRegistrationForm>({
        resolver: yupResolver(schema),
    });
   // console.log(errors);

    useEffect(() => {
        if (initialData) {
          Object.keys(initialData).forEach((key) => {
            const validKey = key as keyof AdminsRegistrationForm;
            setValue(validKey, initialData[validKey]);
          });
        }
      }, [initialData, setValue]);
    

      const handleFormSubmit: SubmitHandler<AdminsRegistrationForm> =  (data) => {   
         
        const formDataWithUserType= {
            ...data,
            userType: UserType.ADMIN,
            statusType: StatusType.ONLINE,
           
             
        };
        try{
            if(initialData){
                 const updatedAdmin = { ...initialData, ...formDataWithUserType };
                  onUpdateAdmin(updatedAdmin);
              }
              else{
                onSubmitAdmin(formDataWithUserType);
              }
        }
        catch(error){
            console.error("Error updating trainer:", error);
        }
        

    };


    return (

        <>
            <div className="fixed bottom-0 max-sm:top-10 max-sm:mt-[-100px] md:top-[30px] left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-30 overflow-x-auto">
                <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg overflow-x-auto z-30 h-[60%] md:h-[85%] ">
                    <div className="flex justify-end">
                        <button onClick={onCancel}>
                            <div className="text-red-700 hover:text-red-500 text-3xl">
                                <IoClose />
                            </div>
                        </button>
                    </div>

                    <h1 className='pb-5 flex justify-center font-bold text-lg text-blue-600'>Admin Form</h1>

                    <form className="max-w-md mx-auto bg-[#ffffff]" onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("firstName")} />
                            {errors.firstName && <small style={{ color: "red" }}>{errors.firstName.message}</small>}
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="floating_surname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("lastName")} />
                            {errors.lastName && <small style={{ color: "red" }}>{errors.lastName.message}</small>}
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="floating_username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("username")} />
                            {errors.username && <small style={{ color: "red" }}>{errors.username.message}</small>}
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("email")} />
                            {errors.email && <small style={{ color: "red" }}>{errors.email.message}</small>}
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("password")} />
                            {errors.password && <small style={{ color: "red" }}>{errors.password.message}</small>}
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="floating_description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("address")} />
                            {errors.address && <small style={{ color: "red" }}>{errors.address.message}</small>}
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                        </div>


                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="floating_price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("phone")} />
                            {errors.phone && <small style={{ color: "red" }}>{errors.phone.message}</small>}
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={onCancel}
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                                Cancel
                            </button>
                            <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminsForm



