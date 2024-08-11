import React, { useState } from "react";
import { IMG_URL } from "../utils/constants";
import Modal from "./Modal";
import { useSelector } from "react-redux";

const PersonCard = ({ name, index, bgColor }) => {
  const [showModal, setShowModal] = useState(false);

  const handleError = (event) => {
    event.target.src = "icon.png"; // Replace with your default image path
  };
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg p-[20px] w-[240px]"
      style={{
        backgroundColor: bgColor || "black",
      }}
    >
      <img
        className="rounded-lg object-cover w-[200px] h-[200px]"
        alt="random"
        src={`${IMG_URL}${index * 10}/200`}
        onError={handleError}
      />
      <h1 className="mt-4 rounded-lg text-white w-[200px] p-[10px] text-center">
        {name}
      </h1>
      <button
        className="text-center text-[12px] text-white cursor-pointer hover:bg-slate-600 p-2 rounded"
        onClick={() => setShowModal(!showModal)}
      >
        Show more
      </button>

      {showModal ? (
        <Modal
          index={index}
          setShowModal={() => setShowModal(!showModal)}
        />
      ) : null}
    </div>
  );
};

export default PersonCard;
