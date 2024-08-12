import React from "react";
import { useSelector } from "react-redux";
import useGetHomeWorldData from "../hooks/useGetHomeWorldData";
import dayjs from "dayjs";

const Modal = ({ setShowModal, index }) => {
  const { name, birth_year, mass, height, created, homeworld, films } =
    useSelector((store) => store.characterData.data[index]);
  const data = useGetHomeWorldData(homeworld);

  if (!data) return;

  const { name: homeWorldName, climate, terrain, population } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ">
      <div className="relative w-auto mx-auto max-w-3x bg-[#7A918D] rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-2xl font-semibold">{name}</h3>
          <button className="text-2xl" onClick={() => setShowModal(false)}>
            ×
          </button>
        </div>
        <div className="px-12 py-6">
          <div className="grid grid-cols-2 gap-4 font-semibold">
            <ul className="text-lg space-y-4">
              <li className="bg-[#6A817F] p-2 rounded-md shadow-sm hover:bg-[#5A716F] transition-colors duration-200">
                <span className="font-bold">BirthYear:</span> {birth_year}
              </li>
              <li className="bg-[#6A817F] p-2 rounded-md shadow-sm hover:bg-[#5A716F] transition-colors duration-200">
                <span className="font-bold">Mass:</span> {mass}
              </li>
              <li className="bg-[#6A817F] p-2 rounded-md shadow-sm hover:bg-[#5A716F] transition-colors duration-200">
                <span className="font-bold">Height:</span> {height}
              </li>
              <li className="bg-[#6A817F] p-2 rounded-md shadow-sm hover:bg-[#5A716F] transition-colors duration-200">
                <span className="font-bold">Created:</span> {dayjs(created).format("DD-MM-YYYY")}
              </li>
              <li className="bg-[#6A817F] p-2 rounded-md shadow-sm hover:bg-[#5A716F] transition-colors duration-200">
                <span className="font-bold">Number of Films:</span> {films.length}
              </li>
            </ul>
            <ul className="text-lg space-y-4">
              <li className="bg-[#6A817F] p-2 rounded-md shadow-sm hover:bg-[#5A716F] transition-colors duration-200">
                <span className="font-bold">HomeWorld:</span> {homeWorldName}
              </li>
              <li className="bg-[#6A817F] p-2 rounded-md shadow-sm hover:bg-[#5A716F] transition-colors duration-200">
                <span className="font-bold">Climate:</span> {climate}
              </li>
              <li className="bg-[#6A817F] p-2 rounded-md shadow-sm hover:bg-[#5A716F] transition-colors duration-200">
                <span className="font-bold">Terrain:</span> {terrain}
              </li>
              <li className="bg-[#6A817F] p-2 rounded-md shadow-sm hover:bg-[#5A716F] transition-colors duration-200">
                <span className="font-bold">Population:</span> {population}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
