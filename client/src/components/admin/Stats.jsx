import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import { useNotification } from '../../hooks/themeHook';
import { getAppInfo } from '../../api/admin';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Anime',
      },
    },
  };

  const labels = ['Review Count','Anime Count','Users Count']

  
function Stats() {
    const [appInfo,setAppInfo] = useState({
        animeCount:0,
        reviewCount:0,
        userCount:0
      })

      const {animeCount,reviewCount,userCount} = appInfo
    // const [chartData,setChartData] = useState({
    //     labels:[animeCount, reviewCount,userCount],
    //     datasets:[{
    //         label:'Website Stats',
    //         data:[animeCount,reviewCount,userCount], backgroundColor: [
    //             'rgba(255, 99, 132, 0.2)',
    //             'rgba(255, 159, 64, 0.2)',
    //             'rgba(255, 205, 86, 0.2)',
    //             'rgba(75, 192, 192, 0.2)',
    //             'rgba(54, 162, 235, 0.2)',
    //             'rgba(153, 102, 255, 0.2)',
    //             'rgba(201, 203, 207, 0.2)'
    //           ],
    //           borderColor: [
    //             'rgb(255, 99, 132)',
    //             'rgb(255, 159, 64)',
    //             'rgb(255, 205, 86)',
    //             'rgb(75, 192, 192)',
    //             'rgb(54, 162, 235)',
    //             'rgb(153, 102, 255)',
    //             'rgb(201, 203, 207)'
    //           ],
    //           borderWidth: 1
    //         }]
       
    // })
    const data = {
        labels,
        datasets: [
          {
            fill:true,
            label: 'Stats',
            data: [reviewCount,animeCount,userCount],
            
            borderColor: 'rgb(69, 150, 243)',
            backgroundColor: 'rgba(70, 19, 117, 0.5)',
          },
        
        ],
      };
      
      const {updateNotification} = useNotification()
      
      const  fetchAppInfo = async ()=>{
      
       const {appInfo,error} = await getAppInfo();
       if(error) return updateNotification('error',error)
      
       setAppInfo({...appInfo})
      }
      
      useEffect(()=>{
        fetchAppInfo()
      },[])
  return (
    <div className='min-h-screen'>
            <Line data={data} options={options}/>
    </div>
  )
}

export default Stats