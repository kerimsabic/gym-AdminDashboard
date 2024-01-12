import React from 'react'
import { GoDotFill } from "react-icons/go";

type Props = {

}

const AccountInfo = (props: Props) => {
    return (
        <>
            <div className='realtive'>
                <div className='z-30 h-[300px] w-[300px] fixed right-5 md:right-40'>
                    <div className="max-w-screen-sm mx-auto mb-36 shadow-2xl rounded-lg bg-[#191d4f] mt-3 p-7">

                        <div className="flex mb-5 w-full justify-center items-center">
                            <div className="w-20 h-20 rounded-full bg-gray-50" >
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="mb-2">
                                <div className="text-center block w-full p-1 text-gray-900  rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500" >
                                    Kerim
                                </div>
                            </div>
                            <div className="mb-5">

                                <div id="large-input" className="text-center block w-full p-1 text-gray-900  rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                    Sabic
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <div id="large-input" className=" text-center block w-full p-1 text-gray-900  rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                kerim.sabic@stu.ibu.edu.ba
                            </div>
                        </div>

                        <div className="mb-5">

                            <div className=" flex mb-5 text-center w-full p-1 text-green-600  sm:text-md focus:ring focus:border items-center justify-center">
                                Online <GoDotFill />
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <button  className='text-white bg-blue-900 p-2 rounded-lg'>SignIn</button>
                            <button className='text-white bg-red-900 p-2 rounded-lg'>Log out</button>
                        </div>





                    </div>
                </div>

            </div>
        </>
    )
}

export default AccountInfo