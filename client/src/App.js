import React, { useState, useEffect } from "react";
import PublicRoutes from "./Routes/PublicRoutes";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import PrivateRoutes from "./Routes/PrivateRoutes";
import ThemeToggle from "./components/ThemeToggle";
import Stomp from "stompjs";

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

  const socket = new WebSocket("ws://localhost:8081/ws");
  const client = Stomp.over(socket);

  client.connect(
    {
      login: "guest",
      passcode: "guest",
    },
    () => {
      console.log("WebSocket connection established.");

      client.subscribe("/topic/messages", (message) => {
        console.log("Received message:", message.body);
      });

      client.send("/app/message", {}, "Hello, WebSocket!");
    },
    (error) => {
      console.error("WebSocket connection failed:", error);
    }
  );

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
