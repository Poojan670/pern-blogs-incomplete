import React, { useEffect } from "react";
import DashboardNav from "../components/sub-components/DashboardNav";

const DashboardLayout = ({ children }) => {
  useEffect(() => {
    document.title = "Dashboard";
  });

  return (
    <>
      <DashboardNav />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;
