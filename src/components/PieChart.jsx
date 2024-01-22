import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData }) => {
  const [monthlyPayment, monthlyInterest, monthlyPrincipal] = chartData;

  console.log(monthlyInterest);
  const data = {
    labels: ["Monthly Interest", "Monthly Principal"],
    datasets: [
      {
        label: "# of Votes",
        data: [monthlyInterest, monthlyPrincipal],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.7)",
          
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {        
    cutout: 150
};
 
  

  return <Doughnut data={data} options={options}/>;
};

export default PieChart;
