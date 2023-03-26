import React, { useEffect } from "react";
import DashboardNav from "../components/DashboardNav";

const DashboardLayout = ({ children, isOpen, setIsOpen, theme }) => {
  useEffect(() => {
    document.title = "Dashboard";
  });
  return (
    <>
      <DashboardNav isOpen={isOpen} setIsOpen={setIsOpen} theme={theme} />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;
