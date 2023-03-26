import React, { useState, useEffect } from "react";
import PublicRoutes from "./Routes/PublicRoutes";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import PrivateRoutes from "./Routes/PrivateRoutes";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);
  const authError = useSelector((state) => state.auth.authError);
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    const body = document.body;
    body.classList.remove(theme === "light" ? "dark" : "light");
    body.classList.add(theme);
  }, [theme]);

  return (
    <div>
      {isAuthenticated ? (
        <PrivateRoutes isOpen={isOpen} setIsOpen={setIsOpen} theme={theme} />
      ) : (
        <PublicRoutes isOpen={isOpen} setIsOpen={setIsOpen} theme={theme} />
      )}
      <ThemeToggle onClick={toggleTheme} theme={theme} />
    </div>
  );
};

export default App;
