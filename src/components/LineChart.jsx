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
      maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Amoratization Chart',
          },
        },

      };

   
      
      
      // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Balance',
            data: price,
            borderColor: '#3326AE',
            backgroundColor: '#3326AE',
          },
          {
            label: 'Interest',
            data: interests,
            borderColor: '#FF483B',
            backgroundColor: '#FF483B',
          },
        ],
      };
    

  return (
    balanceData? 
    <Line options={options} data={data} />:"add Data"
  )
}

export default LineChart