import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Wrapper = ({ children, theme }) => {
  useEffect(() => {
    document.title = "Home";
  });

  return (
    <>
      <Header theme={theme} />
      <main>{children}</main>
      <Footer theme={theme} />
    </>
  );
};

export default Wrapper;
