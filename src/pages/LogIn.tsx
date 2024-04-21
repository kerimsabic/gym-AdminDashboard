import { useForm } from "react-hook-form";


import { login } from "@/store/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";



export type LogInFormData = {
    email: string;
    password: string;
}

/*const schema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required').min(6),
})*/

const LogIn = () => {

    const { register, handleSubmit } = useForm<LogInFormData>({
        // resolver: yupResolver(schema)
    });
    const navigate = useNavigate()
    const { /*loading*/ userToken, error } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>();

    const [helpBoxOpen, setHelpBoxOpen] = useState(true);

    useEffect(() => {
        if (userToken) {
            //  console.log(userToken)
            navigate('/home')
        }
    }, [navigate, userToken])

    const onSubmit = (data: LogInFormData) => {
        dispatch(login(data))
    }





    return (
        <section className="bg-[#e1dfdf relative">
            {
                error &&
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Unable to render data!</h4>
                    <p>{error}</p>
                    <hr />
                    <p className="mb-0">
                        Something went wrong, please try again.
                    </p>
                </div>
            }



            {helpBoxOpen &&
                <div className="absolute bottom-10 right-2  bg-blue-600 p-6 drop-shadow-2xl rounded-lg text-white">
                    <button onClick={() => setHelpBoxOpen(!helpBoxOpen)} className="text-right">X</button>
                    <p className="font-extrabold">IMPORTANT: Once you click sign in wait about 1-2min for server to start and sing in again!</p>
                    <p>Email: nekiadmin@stu.ibu.edu.ba</p>
                    <p>Password: nekiadmin</p>
                    <p>Admin privileges</p>
                </div>
            }
            {!helpBoxOpen &&

                <div className="absolute bottom-10 right-2  bg-blue-600 p-6 drop-shadow-2xl rounded-lg" onClick={() => setHelpBoxOpen(!helpBoxOpen)}>
                    <div className="text-right text-white"> ? </div> 
                    
                </div>


            }


            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">

                    Gym
                </a>
                <div className="w-full bg-[#f0f8ff] rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="text" id="email2" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  {...register("email")} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" id="password2" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("password")} />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LogIn

