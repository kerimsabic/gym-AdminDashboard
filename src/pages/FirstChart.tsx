import { useGetOfflineMembersQuery, useGetOnlineMembersQuery } from '@/store/memberSlice';
import  { useEffect, useRef } from 'react'

import Chart from 'chart.js/auto';

interface MyWindow extends Window {
    myChart?: Chart;
  }
  

  declare const window: MyWindow;
  

  
  const FirstChart = () => {
    const { data: onlineMem } = useGetOnlineMembersQuery();
    const { data: offlineMem } = useGetOfflineMembersQuery();
    const onlineMembersCount = onlineMem?.length || 0;
    const offlineMembersCount = offlineMem?.length || 0;
  
    const chartRef = useRef<HTMLCanvasElement | null>(null);
  
    useEffect(() => {
      if (chartRef.current && onlineMem && offlineMem) {
        const ctx = chartRef.current.getContext('2d')!; 
  
        // Destroy existing chart to prevent memory leaks
        if (window.myChart) {
          window.myChart.destroy();
        }
  
        window.myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Online', 'Offline'],
            datasets: [
              {
                label: 'Members Status',
                data: [onlineMembersCount, offlineMembersCount],
                backgroundColor: [
                  'rgba(75, 192, 192, 0.2)', // Online color
                  'rgba(255, 99, 132, 0.2)', // Offline color
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 2,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }, [onlineMem, offlineMem, onlineMembersCount, offlineMembersCount]);
  
    return (
      <div className='w-[80%] h-[50%]  flex  items-center justify-center'>
        <canvas ref={chartRef} width={400} height={300} />
      </div>
    );
  };
  
  export default FirstChart;
  