import React, { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Loader from "./Loader";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const Home = () => {
  const [filters, setFilters] = useState({
    startDate: [],
    endDate: "",
    gender: "",
    age: "",
  });
  const [dateRange, setDateRange] = useState([]);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const barChartLabels = ["A", "B", "C", "D", "E", "F"];
  const [barChartData, setbarChartData] = useState([]);
  const [lineChartData, setlineChartData] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
  });
  const [lineChartCategoryData, setlineChartCategoryData] = useState([])
  const handleDateChange = (range) => {
    setDateRange(range);
    setError("");
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const handleSubmit = async (event) => {
    setloading(true);
    event.preventDefault();
    try {
      if (!dateRange.length) {
        setError("Please select a date range.");
        return;
      }
      const startDate = formatDate(dateRange[0]);
      const endDate = formatDate(dateRange[1]);
      const filter = {
        startDate,
        endDate,
        ...(filters.gender && { gender: filters.gender }),
        ...(filters.age && { age: filters.age }),
      };
      const res = await fetch(`http://localhost:4000/api/feature/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
      });
      const data = await res.json();
      generateChartsData(data);
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  const generateChartsData = (data) => {
    const arr = new Array(barChartLabels.length).fill(0);
    if (data?.length > 0) {
      for (const feature of data) {
        arr[0] += feature["A"];
        arr[1] += feature["B"];
        arr[2] += feature["C"];
        arr[3] += feature["D"];
        arr[4] += feature["E"];
        arr[5] += feature["F"];
      }

      const lineChartData = data.reduce((acc, item) => {
        const day = item.Day;
        if (!acc[day]) {
          acc[day] = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
        }
        acc[day].A += item.A;
        acc[day].B += item.B;
        acc[day].C += item.C;
        acc[day].D += item.D;
        acc[day].E += item.E;
        acc[day].F += item.F;
        return acc;
      }, {});

      setlineChartData({
        A: Object.values(lineChartData).map((day) => day.A),
        B: Object.values(lineChartData).map((day) => day.B),
        C: Object.values(lineChartData).map((day) => day.C),
        D: Object.values(lineChartData).map((day) => day.D),
        E: Object.values(lineChartData).map((day) => day.E),
        F: Object.values(lineChartData).map((day) => day.F),
      });
      setbarChartData(arr);
    }
  };

  const selectCategory = (categoryName) => {
    setlineChartCategoryData(lineChartData[categoryName])
  }

  useEffect(() => {
    console.log({ barChartData, lineChartData });
  }, [barChartData, lineChartData]);

  return (
    <>
      <div className="flex flex-col items-center w-full mt-6">
        {loading && <Loader />}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center border border-gray-300 rounded py-3 px-4 w-3/5"
        >
          <div className="flex gap-3 w-full justify-between items-center">
            <div className="w-1/3">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select Date *
              </label>
              <div>
                <DateRangePicker
                  value={dateRange}
                  onChange={handleDateChange}
                />
                {error && <div style={{ color: "red" }}>{error}</div>}
              </div>
            </div>
            <div className="w-1/3">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select Gender
              </label>
              <select
                name="gender"
                id="gender"
                onChange={handleChange}
                className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              >
                <option selected disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="w-1/3">
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select Age
              </label>
              <select
                name="age"
                id="age"
                onChange={handleChange}
                className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              >
                <option selected disabled>
                  Select Age
                </option>
                <option value="15-25">15-25</option>
                <option value=">25">{`>25`}</option>
              </select>
            </div>
          </div>
          <div className="mt-3 w-full flex gap-3 justify-end">
            <button
              type="submit"
              className="px-4 bg-[#E54065] py-1 text-white font-medium rounded text-center"
            >
              Apply
            </button>
            <button
              type="button"
              className="px-4 bg-gray-600 py-1 text-white font-medium rounded text-center"
            >
              Reset
            </button>
          </div>
        </form>
        <div className="flex mt-12 h-[300px] items-center gap-4 justify-center w-full">
          <BarChart
            chartData={barChartData}
            labels={barChartLabels}
            title={"Features"}
            legend={"Total Time Spent"}
            selectCategory={selectCategory}
          />
          <LineChart
            chartData={lineChartCategoryData}
            labels={barChartLabels}
            title={"Features"}
            legend={"Total Time Spent"}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
