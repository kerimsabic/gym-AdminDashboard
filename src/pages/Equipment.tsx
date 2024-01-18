import EquipmentCard from '@/components/EquipmentCard'
import useEquipment from '@/hooks/equipmentHooks/useEquipment';
import equipment from '@/services/equipment';
import { useGetEquipmentsQuery } from '@/store/equipmentSlice';
import { Equipments } from '@/utils/types';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { useSelector } from 'react-redux';


type Props = {}

const Equipment = (props: Props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEquipment, setFilteredEquipment] = useState<Equipments[]>();
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filteredEquipment = equipment?.filter(machine => machine.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredEquipment(filteredEquipment);
  }


  //const equipmentData = useEquipment();
  const {data:equipment, isError}=useGetEquipmentsQuery();
  console.log(equipment)

  console.log(useGetEquipmentsQuery());

  return (
    <>
      
      <div className="pt-10  flex justify-center shadow-sm">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 w-full"
        />
        <MagnifyingGlassIcon className="h-6 w-6 ml-2 text-gray-500 shadow-sm" />
      </div>
      <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-4 lg:grid-cols-3">
            {((filteredEquipment || equipment || [])).map((machine:Equipments) => (
              <EquipmentCard
                key={machine.id} 
                image={machine.image || "https://i.ibb.co/r2zns1m/image-01.jpg"} 
                CardTitle={machine.name || "Default Title"} 
                CardManufacturer={machine.manufacturer || "Default Description"} 
                CardType={machine.type}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Equipment