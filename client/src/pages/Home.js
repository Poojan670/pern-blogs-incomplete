import React from "react";
import Wrapper from "../layout/Wrapper";
import Section from "../components/Section";
import Latest from "../components/Latest";
import Popular from "../components/Popular";
import Business from "../components/Business";

const Home = () => {
  return (
    <div>
      <Wrapper>
        <Section />
        <Latest />
        <Popular />
        <Business />
      </Wrapper>
    </div>
  );
};

export default Home;
