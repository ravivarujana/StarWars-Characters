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
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 font-semibold">
            <ul className="text-lg space-y-4">
              <li>BirthYear : {birth_year}</li>
              <li>Mass : {mass}</li>
              <li>Height : {height}</li>
              <li>Created : {dayjs(created).format("DD-MM-YYYY")}</li>
              <li>Number of Films : {films.length}</li>
            </ul>
            <ul className="text-lg space-y-4">
              <li>HomeWorld : {homeWorldName}</li>
              <li>Climate : {climate}</li>
              <li>Terrain : {terrain}</li>
              <li>Population : {population}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
