import React from "react";

const Shimmer = () => {
  return (
    <div className=" animate-pulse flex flex-col items-center justify-center m-3 rounded-lg p-[20px] w-[240px] bg-gray-200">
      <span className="animate-pulse rounded-lg bg-gray-300 w-[200px] h-[200px]" />
      <h1 className=" animate-pulse mt-4 rounded-lg text-white bg-gray-300 p-[10px] w-[200px]"></h1>
    </div>
  );
};

export default Shimmer;
