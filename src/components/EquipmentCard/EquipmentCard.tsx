import { useDeleteEquipmentMutation, useServiceEquipmentMutation } from "@/store/equipmentSlice";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

type Props = {
  id: string;
  image: any;
  CardManufacturer: string;
  CardTitle: string;
  CardType: string;
};

const EquipmentCard = ({
  id,
  image,
  CardType,
  CardManufacturer,
  CardTitle,
}: Props) => {
  const [deleteMachine, { isLoading }] = useDeleteEquipmentMutation();
  const [serviceMachine]= useServiceEquipmentMutation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick =  (machineId:string) => {
    try {
      setShowConfirmation(false);
      console.log(id)
       deleteMachine({ id: machineId });
        
    } catch (error) {
      console.error('Error deleting member:', error);
    
    }
  };

  const handleServiceClick= async (machineId:string)=>{
    try{
      if (window.confirm(`Are you sure you want to service this machine`)) {
        await serviceMachine({ id: machineId })
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-xl duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <img src={image} alt="" className="w-full" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
              {CardTitle}
            </a>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {CardManufacturer}
          </p>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {CardType}
          </p>
          <div className="flex flex-col">
            <button
              onClick={()=>handleServiceClick(id)}
              className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded flex justify-center gap-3 mb-5"
            >
              <FaPlus />
              Service
            </button>
            <button
              onClick={() => setShowConfirmation(true)}
              className="bg-red-600 hover:bg-[#d03e3e] text-white font-bold py-2 px-4 border border-red-700 rounded flex justify-center gap-3"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-xl font-semibold mb-4">
              Are you sure you want to delete this equipment?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="mr-4 text-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={()=>handleDeleteClick(id)}
                className={`bg-red-600 hover:bg-[#d03e3e] text-white font-bold py-2 px-4 border border-red-700 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EquipmentCard;
