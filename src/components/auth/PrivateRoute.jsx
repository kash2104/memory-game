import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Get token from Redux state
  const token = useSelector((state) => state.auth.token);

  //   console.log(token);

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
