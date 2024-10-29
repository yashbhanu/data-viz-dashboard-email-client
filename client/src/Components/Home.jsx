import React from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Home = () => {
  return (
    <div className="flex justify-center w-full mt-6">
      <form className="flex flex-col items-center border border-gray-300 rounded py-3 px-4 w-3/5">
        <div className="flex gap-3 w-full justify-between items-center">
          <div className="w-1/3">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select Date *
            </label>
            <DateRangePicker />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select Gender
            </label>
            <select
              id="gender"
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
              id="age"
              className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            >
              <option selected disabled>
                Select Age
              </option>
              <option value="Male">15-25</option>
              <option value="Female">{`>25`}</option>
            </select>
          </div>
        </div>
        <div className="mt-3 w-full flex gap-3 justify-end">
            <button type="submit" className="px-4 bg-[#E54065] py-1 text-white font-medium rounded text-center">Apply</button>
            <button type="button" className="px-4 bg-gray-600 py-1 text-white font-medium rounded text-center">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Home;
