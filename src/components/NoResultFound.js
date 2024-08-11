import React from "react";

const NoResultFound = () => {
  return (
    <div className="flex items-center justify-center ">
      <h1 className="text-gray-400 font-bold font-mono tracking-widest overflow-hidden border-r-2 border-gray-300 whitespace-nowrap animate-typewriter">
        No Result Found !! Please search for some other Star Wars character.
      </h1>
    </div>
  );
};

export default NoResultFound;
