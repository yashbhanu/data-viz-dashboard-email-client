import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const LineChart = ({ chartData, labels, title, legend }) => {
  const chartRef = useRef(null);
  const data = {
    labels: labels,
    datasets: [
      {
        label: legend,
        data: chartData,
        fill: false,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    // maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            enabled: true,
            sensitivity: 0.1,
          },
          mode: "xy",
        },
        pan: {
          enabled: true,
          mode: "xy",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div className="h-full w-full space-y-2 text-right">
      <div className="h-full w-full flex justify-center">
        <Line data={data} options={options} ref={chartRef} />
      </div>
      <button
        onClick={handleResetZoom}
        className="px-2 py-1 rounded text-secondary text-xs border border-secondary"
      >
        Reset Zoom
      </button>
    </div>
  );
};

export default LineChart;
