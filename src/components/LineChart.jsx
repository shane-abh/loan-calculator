import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ChartDataLabels);

const LineChart = ({ chartData }) => {
  const balanceData = chartData.balance || [];
  const monthlyInterestPayments = chartData.monthlyInterestPayments || [];
  const legendColor = getComputedStyle(
    document.querySelector("body")
  ).getPropertyValue("--text-color");

  console.log(legendColor.toString());

  console.log(chartData);

  const labels = [];
  const price = [];
  const interests = [];

  for (let i = 0; i < balanceData.length; i++) {
    labels.push(balanceData[i].label);
    price.push(balanceData[i].point);
    interests.push(monthlyInterestPayments[i].point);
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: legendColor.toString(),
        },
        position: "bottom",
      },
      title: {
        display: false,
        text: "Amoratization Chart",
      },
      datalabels: {
        color: 'transparent',
      },
    },
    scales: {
      x: {
        title:{
          display:true,
          text: 'Years',
          font: {
            weight: 'bold'
          }
          
        },
        ticks: { color: legendColor.toString() },
        grid: {
          display: false,
        },
      },
      y: {
        title:{
          display:true,
          text: 'Amount',
          font: {
            weight: 'bold'
          }
        },
        ticks: { color: legendColor.toString() },
        grid: {
          display: false,
        },
      },
      
    },
  };

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: "Balance",
        data: price,
        borderColor: "#3326AE",
        backgroundColor: "#3326AE",
      },
      {
        label: "Interest",
        data: interests,
        borderColor: "#FF483B",
        backgroundColor: "#FF483B",
      },
    ],
  };

  return balanceData ? <Line options={options} data={data} /> : "add Data";
};

export default LineChart;
