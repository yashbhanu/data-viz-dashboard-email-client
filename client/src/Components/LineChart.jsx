import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({chartData, labels, title, legend}) => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: legend,
          data: chartData,
          fill: false,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: title,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return <Line className="w-[300px]" data={data} options={options} />;
  }
  
  export default LineChart;