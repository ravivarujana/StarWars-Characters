import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BUTTONS, ERRORS } from "../utils/constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/home");
    } catch (error) {
      alert(ERRORS.INVALID_CREDENTIALS);
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <div>
        <img
          className="absolute h-[100vh] w-full object-cover -z-20"
          src="bg-wallpaper2.jpg"
        />
      </div>
      <div className=" flex items-center  p-12 h-[100vh]">
        <form
          className="flex flex-col w-[32rem] h-[60vh] bg-opacity-50  bg-black p-12 rounded-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-white font-bold text-3xl my-5">Login</h1>
          <input
            className="p-4 my-3 rounded"
            type="text"
            placeholder="Username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="p-4 my-3 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="p-4 my-4 bg-white" type="submit">
            {BUTTONS.LOGIN}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
