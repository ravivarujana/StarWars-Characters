import React, { useState } from "react";
import { IMG_URL } from "../utils/constants";
import Modal from "./Modal";

// PersonCard component: Displays a card with information about a Star Wars character
const PersonCard = ({ name, index, bgColor }) => {
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // Function to handle image loading errors
  const handleError = (event) => {
    event.target.src = "icon.png"; // Replace with your default image path
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg p-4 w-[240px] bg-black"
      style={{
        backgroundColor: bgColor || "black",
      }}
    >
      {/* Character image */}
      <img
        className="rounded-lg object-cover w-[200px] h-[200px]"
        alt="random"
        src={`${IMG_URL}${index * 10}/200`}
        onError={handleError}
      />
      {/* Character name */}
      <h1 className="mt-4 rounded-lg text-white w-[200px] p-2 text-center">
        {name}
      </h1>
      {/* Button to toggle modal visibility */}
      <button
        className="text-center text-sm text-white cursor-pointer hover:bg-slate-600 p-2 rounded"
        onClick={() => setShowModal(!showModal)}
      >
        Show more
      </button>

      {/* Render Modal component if showModal is true */}
      {showModal && (
        <Modal index={index} setShowModal={() => setShowModal(!showModal)} />
      )}
    </div>
  );
};

export default PersonCard;
