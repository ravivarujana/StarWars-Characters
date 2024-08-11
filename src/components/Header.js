import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-full sm:w-11/12 mx-auto flex h-16 items-center justify-center mt-4 bg-black text-white rounded-3xl">
      <div className="flex justify-between w-full px-6 sm:px-12 items-center">
        <h2 className="font-bold text-2xl sm:text-3xl text-center">
          StarWars Heroes
        </h2>
        <div className="flex items-center">
          <h2
            className="text-lg sm:text-xl cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </h2>
          <img
            alt="trooper-mask"
            src={`${process.env.PUBLIC_URL}/icon.png`}
            className="w-10 sm:w-12 ml-3 mb-2 hidden sm:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
