import EquipmentCard from '@/components/EquipmentCard';
import { useGetEquipmentsQuery } from '@/store/equipmentSlice';
import { Equipments } from '@/utils/types';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';



const Equipment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: equipment, isError, isLoading } = useGetEquipmentsQuery();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEquipment = (equipment || []).filter((machine: Equipments) =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="pt-10 flex justify-center shadow-sm">
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
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error loading equipment data.</p>}
          {!isLoading && !isError && (
            <div className="grid gap-5 sm:grid-cols-4 lg:grid-cols-3">
              {filteredEquipment.map((machine: Equipments) => (
                <EquipmentCard
                  key={machine.id}
                  image={machine.image || 'https://i.ibb.co/r2zns1m/image-01.jpg'}
                  CardTitle={machine.name || 'Default Title'}
                  CardManufacturer={machine.manufacturer || 'Default Description'}
                  CardType={machine.type}
                  id={machine.id.toString()}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Equipment;
