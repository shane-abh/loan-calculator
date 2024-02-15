import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
Chart.register(ChartDataLabels);

const PieChart = ({ chartData }) => {
  const [monthlyPayment, monthlyInterest, monthlyPrincipal] = chartData;

  // const doughnutChartRef = useRef(null);

  console.log(monthlyInterest);
  const color = getComputedStyle(
    document.querySelector("body")
  ).getPropertyValue("--pie-secondary-color");


  const headingsColor = getComputedStyle(
    document.querySelector("body")
  ).getPropertyValue("--headings-color");
  console.log(`"${headingsColor}"`);

  const data = {
    labels: ["Monthly Interest", "Monthly Principal"],
    datasets: [
      {
        // labels: ["Montly Interest", "monthlyPrincipal"],
        data: [monthlyInterest, monthlyPrincipal],
        backgroundColor: [color.toString(), headingsColor.toString()],
        // borderColor: [

        borderWidth: 1,
      },
    ],
  };

  const options = {
    // cutout: 100,
    animateRotate: true,
    radius: 100,
    responsive: true,
    // maintainAspectRatio: true,
    aspectRatio: 1.25,
    plugins: {
      legend: {
        labels: {
          color: color.toString(),
        },
        position: "bottom",
        display: true,
      },
      title: {
        display: false,
        text: "Amoratization Chart",
      },
      datalabels: {
        color: 'white',
        formatter: (value, context) => {
          const datapoints = context.chart.data.datasets[0].data;
          function totalSum(total, datapoint){
            return total + datapoint;
          }
          const totalPercentage = datapoints.reduce(totalSum,0);
          const  percentageValue = ((value / totalPercentage ) * 100).toFixed(1)

          return percentageValue + '%';
        }
      },
    
    
    },
  };

  return <Pie data={data} options={options}  />;
};

export default PieChart;
