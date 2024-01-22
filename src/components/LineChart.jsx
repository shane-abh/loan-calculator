import React from 'react'
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
  import faker from 'faker';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

const LineChart = ({chartData}) => {

  const balanceData = chartData.balance || [] ;
  const monthlyInterestPayments = chartData.monthlyInterestPayments || []
  

  console.log(chartData)

  const labels = []
  const price = []
  const interests = []

  for(let i = 0; i< balanceData.length; i++){
    labels.push(balanceData[i].label);
    price.push(balanceData[i].point);
    interests.push(monthlyInterestPayments[i].point)

  }


    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };

   
      
      
      // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: price,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: interests,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    

  return (
    balanceData? 
    <Line options={options} data={data} />:"add Data"
  )
}

export default LineChart