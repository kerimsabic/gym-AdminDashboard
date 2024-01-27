import { useGetAttendanceQuery } from '@/store/attendanceSlice';

import { Attendance } from '@/utils/types';
import { useEffect, useState } from 'react';
import {  XAxis, YAxis, CartesianGrid, Tooltip,  ResponsiveContainer, AreaChart, Area } from 'recharts';



const AttendanceChart = () => {

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



                <div className='flex flex-col h-full w-full'>
                    <h1 className='flex justify-center'>Attendace by Date</h1>
                    <ResponsiveContainer width="100%" height={300}>
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
        </>
    )
}

export default AttendanceChart
