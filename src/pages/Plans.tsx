import Table from '@/components/MembersTable'
import { TrainingPlan } from '@/utils/types';
import { Card, Chip, Typography } from '@material-tailwind/react';
import React from 'react'
import { MdDelete, MdOutlineManageAccounts } from 'react-icons/md';
import { IoSettings } from "react-icons/io5";

const TABLE_HEAD = ["Plan Name", "Price", "NumOfUsers"];

const TABLE_ROWS:TrainingPlan[] = [
  {
    planName: "Plan 1",
    price: "50$",
    numOfUsers: 50,
    status: true,
  
  },
  {
    planName: "Plan 1",
    price: "50$",
    numOfUsers: 50,
    status: true,

  },
  {
    planName: "Plan 1",
    price: "50$",
    numOfUsers: 50,
    status: true,

  },
  {
    planName: "Plan 1",
    price: "50$",
    numOfUsers: 50,
    status: true,

  },
  {
    planName: "Plan 1",
    price: "50$",
    numOfUsers: 50,
    status: false,

  },
];

const countActiveTrainingPlans = (plans: TrainingPlan[]): number => {
  return plans.reduce((count, plan) => (plan.status ? count + 1 : count), 0);
};
const countInactiveTrainingPlans = (plans: TrainingPlan[]): number => {
  return plans.reduce((count, plan) => (!plan.status ? count + 1 : count), 0);
};

type Props = {}

const Plans = (props: Props) => {

  const activePlansCount: number = countActiveTrainingPlans(TABLE_ROWS);
  const inactivePlansCount: number = countInactiveTrainingPlans(TABLE_ROWS);


  return (
    <div className='w-[50%] mx-auto mt-[80px]   max-md:w-[95%] '>
      <div className='flex mb-16'>
        <div className=' border-solid border-2 border-white w-48 h-32 flex flex-col shadow-2xl rounded-3xl'>
          <div className="text-center font-medium  mt-5 h-full">
            Active Trainig Plans
          </div>
          <div className="text-center font-medium  mt-5 h-full">
            <h1 className='text-5xl max-md:text-lg font-black'>
            {activePlansCount}
            </h1>
          </div>
        </div>
        <div className=' border-solid border-2 border-white w-48 h-32 flex flex-col shadow-2xl rounded-3xl'>
          <div className="text-center font-medium text-lg mt-5 h-full">
            Inactive Trainig Plans
          </div>
          <div className="text-center font-medium text-lg mt-5 h-full">
            <h1 className='text-5xl font-black'>
            {inactivePlansCount}
            </h1>
          </div>
        </div>
      </div>
      <div className='mb-16'>
      <Card className="h-full w-full overflow-scroll" placeholder={undefined}>
        <table className="w-full min-w-max table-auto text-left text-center">
          <thead className=''>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70" placeholder={undefined}                >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({planName, price, numOfUsers, status }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={planName}>
                  <td className={classes}>
                  <Typography placeholder={undefined}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {planName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography placeholder={undefined}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {price}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography placeholder={undefined}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {numOfUsers}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      value={status ? "active" : "deactivated"}
                      className={status ? "text-green-500" : "text-red-500"}
                    />
                  </td>
                  <td className={classes}>
                    <Typography placeholder={undefined}
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="text-3xl flex justify-between"
                    >
                      <MdDelete />
                      <IoSettings />
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      </div>
    </div>
  )
}

export default Plans