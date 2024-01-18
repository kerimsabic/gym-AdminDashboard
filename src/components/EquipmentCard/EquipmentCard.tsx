import { FaPlus } from "react-icons/fa"


type Props = {
    image: any,
    CardManufacturer: string,
    CardTitle: string,
    CardType: string

}

const EquipmentCard = ({ image, CardType, CardManufacturer, CardTitle }: Props) => {

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
                            className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded flex justify-center gap-3 mb-5">
                            <FaPlus />
                            Service
                        </button>
                        <button
                            className="bg-red-600 hover:bg-[#d03e3e] text-white font-bold py-2 px-4 border border-red-700 rounded flex justify-center gap-3">
                            
                            Remove
                        </button>
                    </div>
                    


                </div>
            </div>
        </>
    )
}

export default EquipmentCard


