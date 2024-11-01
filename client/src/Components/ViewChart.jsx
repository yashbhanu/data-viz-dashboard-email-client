import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Loader from "./Loader";
import { generateChartsData } from "../helper";
import { toast } from "react-toastify";

const ViewChart = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const age = queryParams.get("age");
  const gender = queryParams.get("gender");
  const feature = queryParams.get("feature");
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
  const token = localStorage.getItem("token")

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
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}api/feature/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify(filter),
      });
      const data = await res.json();
      if(!data?.length) {
        toast.error("No Data found")
        return
      }
      renderChartData(data);
    } catch (error) {
      toast.error(error?.message || "Something went wrong")
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
    <div className="flex flex-col items-center w-full h-[100vh]">
      {loading && <Loader />}
      { showChart ? (
        <div className="flex flex-col my-12 relative h-[400px] md:w-[600px] w-full items-center gap-8">
          <BarChart
            chartData={barChartData}
            labels={barChartLabels}
            title={"Features"}
            legend={"Total Time Spent (Click on Feature to view it's Timeline)"}
            selectCategory={selectCategory}
          />
          <LineChart
            chartData={lineChartCategoryData}
            labels={lineChartLabels}
            title={`Feature ${currentCategory}`}
            legend={"Total Time Spent"}
          />
        </div>
      ) : (!showChart && !loading) ? (<span className="absolute top-1/2 left-1/2 mt-[-50px] ml-[-100px] text-3xl font-semibold">No Data Found!</span>) : <></>}
    </div>
  );
};

export default ViewChart;
