import useCreatePlans from '@/hooks/planHooks/useCreatePlans';
import useDeletePlans from '@/hooks/planHooks/useDeletePlans';
import usePlans from '@/hooks/usePlans';
import { StatusType, TrainingPlan } from '@/utils/types';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  closeModal: (value: boolean) => void;
 
};

const schema = yup.object(
  {
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.string().required("Price is required"),
  }
).required()

export type PlanRegisterForm = {
  id: string
  name: string;
  description: string;
  price: string;
  statusType: StatusType;
}

const PlansForm = ({ closeModal }: Props) => {


  const { register, handleSubmit, formState: { errors } } = useForm<PlanRegisterForm>({
    resolver: yupResolver(schema)
  })

  const createPlan = useCreatePlans();

  const handleCreatePlan: SubmitHandler<PlanRegisterForm> =  (data) => {
    createPlan.mutate(data);
  };  

  if (createPlan.isSuccess){
    closeModal(false);
  }





  return (
    <>
      <div className="fixed bottom-0 max-sm:top-[10px] left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-30 overflow-x-auto">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg overflow-x-auto z-30 h-[60%]">
          <div className="flex justify-end">
            <button onClick={() => closeModal(false)}>
              <div className="text-black text-3xl">
                <IoClose />
              </div>
            </button>
          </div>

          <h1>Add Plan</h1>


          <form className="max-w-md mx-auto bg-[#ffffff]" onSubmit={handleSubmit(handleCreatePlan)}>
            <div className="relative z-0 w-full mb-5 group">
              <input type="name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("name")} />
              {errors.name && <small style={{ color: "red" }}>{errors.name.message}</small>}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Plan Name</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" id="floating_description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("description")} />
              {errors.description && <small style={{ color: "red" }}>{errors.description.message}</small>}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Plan Description</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" id="floating_price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("price")} />
              {errors.price && <small style={{ color: "red" }}>{errors.price.message}</small>}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Plan Price</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <select
                id="floating_statusType"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
                {...register("statusType")}
              >
                <option value="ONLINE">ONLINE</option>
                <option value="OFFLINE">OFFLINE</option>
              </select>
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Status Type</label>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => closeModal(false)}
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Cancel
              </button>
              <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={createPlan.isLoading} value={createPlan.isLoading ? "Creating..." : "Submit"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PlansForm;


