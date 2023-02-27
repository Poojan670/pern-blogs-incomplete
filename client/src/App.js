import React, { useEffect } from "react";
import PublicRoutes from "./Routes/PublicRoutes";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import PrivateRoutes from "./Routes/PrivateRoutes";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return <>{isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}</>;
};

export default App;
