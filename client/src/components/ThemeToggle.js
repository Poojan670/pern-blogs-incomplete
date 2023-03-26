import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function ThemeToggle({ onClick, theme }) {
  return (
    <button
      className="fixed top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      onClick={onClick}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}

export default ThemeToggle;
