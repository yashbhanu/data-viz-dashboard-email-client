import React from "react";

export const ListLoader = () => {
  return (
    <div className="mt-12 space-y-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex items-start p-4 border rounded-lg shadow-sm bg-white border-gray-200"
        >
          <div className="w-10 h-10 rounded-full bg-borderColor"></div>

          <div className="ml-4 space-y-4 flex-grow">
            <div className="h-4 bg-borderColor rounded w-3/4"></div>
            <div className="h-4 bg-borderColor rounded w-1/2"></div>
            <div className="h-4 bg-borderColor rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const DetailsLoader = () => {
  return (
    <div class="animate-pulse self-start w-3/5 border border-borderColor bg-white p-5 rounded-lg">
      <div class="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>

      <div class="flex items-center justify-between space-x-4 mb-4">
        <div class="w-2/5 h-5 bg-gray-300 rounded"></div>
        <div class="w-1/5 h-5 bg-gray-300 rounded"></div>
      </div>
      <div class="w-2/5 my-4 h-5 bg-gray-300 rounded"></div>
      <div class="space-y-3">
        <div class="w-full h-32 bg-gray-300 rounded"></div>
        <div class="w-full h-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};