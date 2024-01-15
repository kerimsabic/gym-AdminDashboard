import TrainersTable from '@/components/TrainersTable';
import { Card, Chip, Typography } from '@material-tailwind/react';
import { MdDelete } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";

type Props = {}


const TABLE_HEAD = ["Image", "Name", "Email", "Status", "Edit"];

const Trainers = (props: Props) => {
  return (
      <div>
        <TrainersTable/>
      </div>
  )
}

export default Trainers