import React, { useContext } from "react";
import Login from "./Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import { AuthContext } from "../context/AuthContext";
import ErrorComponent from "./ErrorComponent";

const Body = () => {
  const { user } = useContext(AuthContext);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: user ? <Navigate to="/home" /> : <Login />,
      errorElement: <ErrorComponent />,
    },
    {
      path: "/home",
      element: user ? <Home /> : <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
