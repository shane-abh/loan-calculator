import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData }) => {
  const [monthlyPayment, monthlyInterest, monthlyPrincipal] = chartData;

  console.log(monthlyInterest);
  const color = getComputedStyle(document.querySelector(':root'))
    .getPropertyValue('--text-color');
    console.log(`"${color}"`)
  const data = {
    labels: ["Monthly Interest", "Monthly Principal"],
    datasets: [
      {
        // labels: ["Montly Interest", "monthlyPrincipal"],
        data: [monthlyInterest, monthlyPrincipal],
        backgroundColor: [
          `"${color}"`,
          "#3326AE",
          
        ],
        // borderColor: [
        
        borderWidth: 1,
      },
    ],
  };

  const options = {        
    cutout: 100, 
    animateRotate: true,
    radius: 150,
    responsive: true,
    maintainAspectRatio: true,
};
 
  

  return <Doughnut data={data} options={options}/>;
};

export default PieChart;
