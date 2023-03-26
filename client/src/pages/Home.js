import React from "react";
import Wrapper from "../layout/Wrapper";
import Section from "../components/Section";
import Latest from "../components/Latest";
import Popular from "../components/Popular";
import Business from "../components/Business";

const Home = ({ theme }) => {
  return (
    <div>
      <Wrapper theme={theme}>
        <Section theme={theme} />
        <Latest theme={theme} />
        <Popular theme={theme} />
        <Business theme={theme} />
      </Wrapper>
    </div>
  );
};

export default Home;
