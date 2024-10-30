import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 opacity-60 backdrop-blur-sm z-50">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
