
import { useGetAttendanceQuery } from '@/store/attendanceSlice';
import { useGetOfflineMembersQuery, useGetOnlineMembersQuery } from '@/store/memberSlice';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle, AreaChart, Area } from 'recharts';

type Props = {}


const SecondChart = (props: Props) => {

    const { data: onlineMem } = useGetOnlineMembersQuery();
    const { data: offlineMem } = useGetOfflineMembersQuery();

    const { data: attendance } = useGetAttendanceQuery();

    const onlineMembersCount = onlineMem?.length || 0;
    const offlineMembersCount = offlineMem?.length || 0;


    const data = [
        { name: 'ONLINE', members: onlineMembersCount },
        { name: 'OFFLINE', members: offlineMembersCount }
    ];



    return (
        <>
            <div className='flex flex-col h-full w-full'>
                <ResponsiveContainer width={500} height={500}>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" aria-label='online' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="members" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>



            <div className='flex flex-col h-full w-full'>
                <ResponsiveContainer width={500} height={500} >
                    <AreaChart
                        width={500}
                        height={400}
                        data={attendance}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="name" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default SecondChart