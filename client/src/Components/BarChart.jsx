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
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
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
        hoverBackgroundColor: "#4b5563",
        hoverBorderColor: "#4b5563",
      },
    ],
  };

  const options = {
    onClick: (e) => {
      const myChart = chartRef.current;
      const points = myChart.getElementsAtEventForMode(
        e,
        "nearest",
        { intersect: true },
        true
      );
      let label = "";
      if (points.length) {
        const firstPoint = points[0];
        label = myChart.data.labels[firstPoint.index];
      }
      console.log("label", label);
      selectCategory(label);
    },
    onHover: (evt, activeEls) => {
      activeEls.length > 0
        ? (evt.chart.canvas.style.cursor = "pointer")
        : (evt.chart.canvas.style.cursor = "default");
    },
    // maintainAspectRatio: true,
    responsive: true,
    indexAxis: "y",
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
            sensitivity: 0.1,
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
        <Bar ref={chartRef} data={data} options={options} />
      </div>
      <button
        onClick={handleResetZoom}
        className="px-2 py-1 rounded text-primary text-xs border border-primary"
      >
        Reset Zoom
      </button>
    </div>
  );
};

export default BarChart;
