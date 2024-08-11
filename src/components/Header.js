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
    <div className="absolute z-10 w-full flex h-24 items-center px-16 justify-between">
      <div>
        <h2 className="font-bold text-3xl">Star War Heroes</h2>
      </div>
      <div className="flex items-center">
        <img
          alt="trooper-mask"
          src={`${process.env.PUBLIC_URL}/icon.png`}
          className="w-12 mx-5"
        />
        <h2 className="text-xl cursor-pointer" onClick={handleLogout}>
          Logout
        </h2>
      </div>
    </div>
  );
};

export default Header;
