import { useGetAttendanceQuery } from '@/store/attendanceSlice';
import { useGetOfflineMembersQuery, useGetOnlineMembersQuery } from '@/store/memberSlice';
import { Attendance } from '@/utils/types';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, Label } from 'recharts';




const SecondChart = () => {

    const { data: onlineMem } = useGetOnlineMembersQuery();
    const { data: offlineMem } = useGetOfflineMembersQuery();

    const onlineMembersCount = onlineMem?.length || 0;
    const offlineMembersCount = offlineMem?.length || 0;

    const data = [
        { name: 'ONLINE', members: onlineMembersCount },
        { name: 'OFFLINE', members: offlineMembersCount }
    ];


    const { data: attendanceData } = useGetAttendanceQuery();
    const [chartData, setChartData] = useState<ChartData[]>([]);

    type ChartData = {
        date: string;
        attendances: number;
    }

    useEffect(() => {
        if (attendanceData) {
            const groupedData: { [date: string]: number } = {};
            attendanceData.forEach((entry: Attendance) => {
                const date = entry.date.substring(5, 10);
                groupedData[date] = groupedData[date] ? groupedData[date] + 1 : 1;
            });

            const chartDataArray = Object.keys(groupedData).map(date => ({
                date,
                attendances: groupedData[date]
            }));

            setChartData(chartDataArray);
        }
    }, [attendanceData]);



    return (
        <>
        <div className='mt-10 mb-10'> 
            <div className='flex flex-col h-full w-full mb-11'>
            <h1 className='flex justify-center'>Members Status Type</h1>
                <ResponsiveContainer width="100%" height={350}>
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
                        <Label value="Pages of my website"  />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="members" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>      
            </div>


                    
            <div className='flex flex-col h-full w-full'>
                <h1 className='flex justify-center'>Attendace by Date</h1>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="attendances" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            </div>
            <h1>Hello</h1>
        </>
    )
}

export default SecondChart