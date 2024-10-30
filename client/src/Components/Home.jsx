import React, { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Loader from "./Loader";

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
      console.log({ data });
      console.log({ startDate, endDate });
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    console.log({ dateRange, filters });
  }, [dateRange, filters]);

  return (
    <>
      <div className="flex justify-center w-full mt-6">
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
      </div>
    </>
  );
};

export default Home;
