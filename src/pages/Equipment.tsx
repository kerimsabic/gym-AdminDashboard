import EquipmentCard from '@/components/EquipmentCard';
import EquipmentForm from '@/components/EquipmentCard/EquipmentForm';
import { useAddEquipmentMutation, useGetEquipmentsQuery } from '@/store/equipmentSlice';
import { Equipments } from '@/utils/types';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const Equipment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: equipment, isError, isLoading } = useGetEquipmentsQuery();

  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const handleCancelAdd = () => { setAddFormVisible(false) };

  const [addEquipment] = useAddEquipmentMutation();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEquipment = (equipment || []).filter((machine: Equipments) =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isAddFormVisible && (
        <EquipmentForm
          onCancel={handleCancelAdd}
          onSubmitEquipment={async (formData: any) => {
            try {


              await addEquipment(formData)



            } catch (error) {
              console.log(error)
            }
            setAddFormVisible(false);
          }}
          />
      )}
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
      <button onClick={() => { setAddFormVisible(true); }}
        className="bg-blue-500 hover:bg-[#191d4f] text-white font-bold py-2 px-4 border border-blue-700 rounded flex items-center gap-3">
        <FaPlus />
        Add Equipment
      </button>
      <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center">
        <div className="container">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error loading equipment data.</p>}
          {!isLoading && !isError && (
            <div className="grid gap-5 sm:grid-cols-4 lg:grid-cols-3">
              {filteredEquipment.map((machine: Equipments) => {
                const lastService = machine.serviceHistory ? machine.serviceHistory[machine.serviceHistory.length - 1] : 'No service history';
                const lastServiceDate = lastService.substring(0, 10)
                return (
                  <EquipmentCard
                    key={machine.id}
                    image={machine.image || 'https://i.ibb.co/r2zns1m/image-01.jpg'}
                    CardTitle={machine.name || 'Default Title'}
                    CardManufacturer={machine.manufacturer || 'Default Description'}
                    CartDate={lastServiceDate}
                    id={machine.id.toString()}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Equipment;
