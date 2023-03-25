import React, { useEffect } from "react";
import DashboardNav from "../components/DashboardNav";

const DashboardLayout = ({ children, isOpen, setIsOpen }) => {
  useEffect(() => {
    document.title = "Dashboard";
  });
  return (
    <>
      <DashboardNav isOpen={isOpen} setIsOpen={setIsOpen} />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;
