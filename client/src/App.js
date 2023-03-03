import React, { useState } from "react";
import PublicRoutes from "./Routes/PublicRoutes";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import PrivateRoutes from "./Routes/PrivateRoutes";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isAuthenticated ? (
        <PrivateRoutes isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <PublicRoutes isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default App;
