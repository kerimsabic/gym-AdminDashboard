import TrainersTable from '@/components/TrainersTable';

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