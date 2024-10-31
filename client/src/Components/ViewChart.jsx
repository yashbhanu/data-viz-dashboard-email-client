import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Loader from "./Loader";
import { generateChartsData } from "../helper";

const ViewChart = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const age = queryParams.get("age");
  const gender = queryParams.get("gender");
  const feature = queryParams.get("feature");
  console.log({ startDate, endDate, age, gender, feature });
  const [loading, setloading] = useState(false);
  const barChartLabels = ["A", "B", "C", "D", "E", "F"];
  const [lineChartLabels, setlineChartLabels] = useState([]);
  const [barChartData, setbarChartData] = useState([]);
  const [lineChartData, setlineChartData] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
  });
  const [lineChartCategoryData, setlineChartCategoryData] = useState([]);
  const [currentCategory, setcurrentCategory] = useState(feature || "");
  const [showChart, setshowChart] = useState(false);

  const handleSubmit = async () => {
    setloading(true);
    try {
      if (!startDate || !endDate) {
        return;
      }
      const filter = {
        startDate,
        endDate,
        ...(gender && { gender: gender }),
        ...(age && { age: age }),
      };
      const res = await fetch(`http://localhost:4000/api/feature/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
      });
      const data = await res.json();
      renderChartData(data);
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  const selectCategory = (categoryName) => {
    setlineChartCategoryData(lineChartData[categoryName]);
    setcurrentCategory(categoryName);
  };

  const renderChartData = (data) => {
    const { formatLineChartData, arr, lineChartLabels } = generateChartsData(
      data,
      barChartLabels
    );
    setlineChartLabels(lineChartLabels);
    setlineChartData(formatLineChartData);
    setbarChartData(arr);
    setshowChart(true);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    if (feature) {
      selectCategory(feature);
    }
  }, [lineChartData]);

  return (
    <div className="flex flex-col items-center w-full mt-6">
      {loading && <Loader />}
      {showChart && (
        <div className="flex flex-col mt-12 w-full h-[300px] items-center gap-8">
          <BarChart
            chartData={barChartData}
            labels={barChartLabels}
            title={"Features"}
            legend={"Total Time Spent"}
            selectCategory={selectCategory}
          />
          <LineChart
            chartData={lineChartCategoryData}
            labels={lineChartLabels}
            title={`Feature ${currentCategory}`}
            legend={"Total Time Spent on Day"}
          />
        </div>
      )}
    </div>
  );
};

export default ViewChart;
