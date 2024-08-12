import { useNavigate, useRouteError } from "react-router-dom";
import { ERRORS } from "../utils/constants";

const ErrorComponent = () => {
  const navigate = useNavigate();
  const err = useRouteError();

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <button
        className="font-bold font-mono uppercase bg-white opacity-70 py-2 px-4 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        Wrong Turn
      </button>
      <div className="flex flex-col items-center justify-center">
        <h1 className=" font-bold font-mono uppercase text-white opacity-70 p-4">
          {err.data}
        </h1>
        <h1 className="text-gray-800 text-4xl md:text-5xl font-bold font-mono uppercase tracking-widest cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-white animate-shine">
          {ERRORS.PAGE_NOT_FOUND}
        </h1>
      </div>
    </div>
  );
};

export default ErrorComponent;
