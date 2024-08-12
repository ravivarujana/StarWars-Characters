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

// Main component for routing and authentication
const Body = () => {
  // Get user authentication status from AuthContext
  const { user } = useContext(AuthContext);

  // Define routes with authentication checks
  const appRouter = createBrowserRouter([
    {
      path: "/",
      // Redirect to home if user is authenticated, otherwise show login
      element: user ? <Navigate to="/home" /> : <Login />,
      // Display custom error component for any errors in this route
      errorElement: <ErrorComponent />,
    },
    {
      path: "/home",
      // Show home component if user is authenticated, otherwise redirect to login
      element: user ? <Home /> : <Navigate to="/" />,
    },
  ]);

  // Render the router with defined routes
  return <RouterProvider router={appRouter} />;
};

export default Body;
