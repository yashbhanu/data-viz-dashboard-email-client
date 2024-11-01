import React, { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Loader from "./Loader";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { copyToClipBoard, formatDate, generateChartsData } from "../helper";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['age', 'gender', 'startDate', 'endDate']);
  const [filters, setFilters] = useState({
    gender: cookies.gender || "",
    age: cookies.age || "",
  });
  const [dateRange, setDateRange] = useState(cookies.startDate && cookies.endDate ? [new Date(cookies.startDate), new Date(cookies.endDate)] : []);
  const [error, setError] = useState("");
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
  const [currentCategory, setcurrentCategory] = useState("");
  const [showChart, setshowChart] = useState(false);
  const token = localStorage.getItem("token")
  const handleDateChange = (range) => {
    setDateRange(range || []);
    setCookie('startDate', !range ? "" : formatDate(range[0]))
    setCookie('endDate', !range ? "" : formatDate(range[1]))
    setError("");
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setCookie(e.target.name, e.target.value);
  };

  const clearAllCookies = () => {
    Object.keys(cookies).forEach((cookieName) => {
      removeCookie(cookieName, { path: '/' });
    });
    setFilters({
      gender: "",
      age: "",
    })
    setDateRange([])
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

  const selectCategory = (categoryName) => {
    setlineChartCategoryData(lineChartData[categoryName]);
    setcurrentCategory(categoryName);
  };

  const handleShareLink = () => {
    const link = `${process.env.REACT_APP_CLIENT_URL}view-chart?startDate=${formatDate(
      dateRange[0]
    )}&endDate=${formatDate(dateRange[1])}&age=${
      filters.age
    }&gender=${filters.gender}&feature=${currentCategory}`;
    copyToClipBoard(link);
    toast.success("Link Copied Successfully")
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full mt-6">
        {loading && <Loader />}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center border border-gray-300 rounded py-3 px-4 lg:w-3/5 sm:w-4/5 w-full"
        >
          <div className="flex gap-3 w-full justify-between items-start">
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
                value={filters.gender}
                onChange={handleChange}
                className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              >
                <option value="" disabled>
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
                value={filters.age}
                onChange={handleChange}
                className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              >
                <option value="" disabled>
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
              className="px-4 bg-primary py-1 text-white font-medium rounded text-center"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={clearAllCookies}
              className="px-4 bg-gray-600 py-1 text-white font-medium rounded text-center"
            >
              Reset
            </button>
            {showChart && (
              <button
                onClick={handleShareLink}
                type="button"
                className="px-4 bg-sky-600 py-1 text-white font-medium rounded text-center"
              >
                Share Chart
              </button>
            )}
          </div>
        </form>
        {showChart && (
          <div className="flex flex-col mt-12 h-[300px] md:w-[600px] w-full relative items-center gap-8">
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
              legend={"Total Time Spent on Day"}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
