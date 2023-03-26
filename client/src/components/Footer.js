import classNames from "classnames";
import React from "react";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import NewsLetter from "./sub-components/NewsLetter";

const Footer = ({ theme }) => {
  const bg = {
    background: "url('images/footer.png')no-repeat",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom left",
  };
  return (
    <div
      className={classNames("bg-gray-800", theme === "dark" && "bg-gray-800")}
    >
      <NewsLetter theme={theme} />
      <div
        className={classNames(
          "container mx-auto flex justify-center py-12 bg-gray-50",
          theme === "dark" && "bg-gray-800"
        )}
      >
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
            className="text-gray-600 text-center
           font-bold mt-1 rounded-l space-y-7 flex-shrink
            w-full py-10 snap-x 
            p-10 transition-opacity duration-200 opacity-40 
            space-x-5 min-h-scree xl:space-y-w-28 filter duration grays
             ease-in group text-3xl opacity h-10 top-0 grid-col
              gap-5 group relative border-gray-500 grid-cols-4"
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
