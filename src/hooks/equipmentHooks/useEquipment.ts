import { useQuery } from "react-query";
import { EquipmentService } from "@/services";

const useEqipment = () => {
    return useQuery('equipment',
        () => EquipmentService.getEquipment(),
        
    );
    
}

export default useEqipment;