import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ labels, title, legend, chartData, selectCategory }) => {
  const chartRef = useRef(null);
  const data = {
    labels: labels,
    datasets: [
      {
        label: legend,
        data: chartData,
        backgroundColor: "#E54065",
        borderColor: "#E54065",
        borderWidth: 1,
        hoverBackgroundColor: '#4b5563',
        hoverBorderColor: '#4b5563',
      },
    ],
  };

  const options = {
    onClick: (e) => {
        const myChart = chartRef.current;
        const points = myChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
        let label = ''
        if (points.length) {
            const firstPoint = points[0];
            label = myChart.data.labels[firstPoint.index];
        }
        console.log('label', label)
        selectCategory(label)
    },
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        onHover: (e) => {
          if(e?.target?.style?.cursor) {
            e.target.style.cursor = 'pointer';
          }
        },
        position: "top",
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

  return <Bar className="w-[300px]" ref={chartRef} data={data} options={options} />;
};

export default BarChart;
