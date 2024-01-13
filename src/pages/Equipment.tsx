import EquipmentCard from '@/components/EquipmentCard'
import useEquipment from '@/hooks/equipmentHooks/useEquipment';
import equipment from '@/services/equipment';
import { Equipments } from '@/utils/types';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';


type Props = {}

const Equipment = (props: Props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEquipment, setFilteredEquipment] = useState<Equipments[]>();
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filteredEquipment = equipmentData.data?.filter(equipment => equipment.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredEquipment(filteredEquipment);
  }


  const equipmentData = useEquipment();

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
            {((filteredEquipment || equipmentData.data || [])).map((equipment) => (
              <EquipmentCard
                key={equipment.id} // Make sure to include a unique key for each element in the array
                image={equipment.image || "https://i.ibb.co/r2zns1m/image-01.jpg"} // Use actual property from equipment data
                CardTitle={equipment.name || "Default Title"} // Replace with actual property
                CardManufacturer={equipment.manufacturer || "Default Description"} // Replace with actual property
                CardType={equipment.type}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Equipment