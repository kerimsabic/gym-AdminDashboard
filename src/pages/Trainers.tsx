import { Card, Chip, Typography } from '@material-tailwind/react';
import { MdDelete } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";

type Props = {}


const TABLE_HEAD = ["Image", "Name", "Email", "Status", "Edit"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    status: true,
    plan: "30 days"

  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    status: false,

  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    status: false,

  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    status: true,

  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    status: false,

  },
];


const Trainers = (props: Props) => {
  return (
    <div className="w-[80%]  mx-auto flex md:justify-center max-md:w-[95%] mt-10">
      <div className=" w-full  max-md:overflow-x-scroll">
        <table className="w-full min-w-max table-auto text-left text-center">
          <thead className=''>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <div className="font-normal leading-none opacity-70"                >
                    {head}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ img, name, email, status }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black overflow-hidden">
                      <img src={img} alt={name} className="object-cover w-full h-full" />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="font-normal"
                    >
                      {name}
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="font-normal"
                    >
                      {email}
                    </div>
                  </td>
                  <td className={classes}>
                    <Chip
                      value={status ? "online" : "offline"}
                      className={status ? "text-green-500" : "text-red-500"}
                    />
                  </td>
                  <td className={classes}>
                    <div className="text-3xl flex justify-between"
                    >
                      <MdDelete />
                      <MdOutlineManageAccounts />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Trainers