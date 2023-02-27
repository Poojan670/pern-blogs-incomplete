import React from "react";
import Author from "./Author";

const Related = () => {
  return (
    <section className="pt-20">
      <h1 className="font-bold text-3xl py-10">Related</h1>

      <div className="flex flex-col gap-10">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </section>
  );
};

function Post() {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <a href="/#">
          <img
            src="images/gintoki.png"
            alt=""
            width={300}
            height={200}
            className="rounded"
          />
        </a>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="category">
          <a href="/#" className="text-orange-600 hover:text-orange-800">
            Business Travel
          </a>
          <a href="/#" className="text-gray-800 hover:text-gray-600">
            -July 23,2022
          </a>
        </div>
        <div className="title">
          <a
            href="/#"
            className="text-xl font-bold text-gray-800 hover:text-gray-600"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </a>
        </div>
        <Author />
      </div>
    </div>
  );
}

export default Related;
