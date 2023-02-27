import React from "react";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import NewsLetter from "./sub-components/NewsLetter";

const Footer = () => {
  const bg = {
    background: "url('images/footer.png')no-repeat",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom left",
  };
  return (
    <div className="bg-gray-50 m-0" style={bg}>
      <NewsLetter />
      <div className="container mx-auto flex justify-center py-12">
        <div className="py-5">
          <div className="flex gap-6 justify-center">
            <a href="/">
              <ImFacebook color="#888888" />
            </a>
            <a href="/">
              <ImTwitter color="#888888" />
            </a>
            <a href="/">
              <ImLinkedin2 color="#888888" />
            </a>
          </div>
          <p className="py-5 text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quas
            laboriosam dolores qui cumque id.
          </p>
          <p
            className="text-gray-400 text-center text-white gap-5
           font -bold mt-1 space-x-2 py-5 rounded-l space-y-7 flex-shrin w-fu h-28 l overflow-x-sc py-10 snap-x
          overflow-x-scroll text-2xl p-10 transition-opacity duration-200 opacity-40 space-x-5 min-h-scree xl: space-y-w-28 filter duration grays ease-in group text-3xl  opacity h-full h-24
          top-0 grid-col gap-5 group relative border-gray-500 h-24 h-32 grid-cols-4
          "
          >
            Terms & Conditions
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center"></div>
    </div>
  );
};

export default Footer;
