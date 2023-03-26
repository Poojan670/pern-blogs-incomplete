import React from "react";
import { Link } from "react-router-dom";
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
        <Link to="/#">
          <img
            src="images/gintoki.png"
            alt=""
            width={300}
            height={200}
            className="rounded"
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="category">
          <Link to="/#" className="text-orange-600 hover:text-orange-800">
            Business Travel
          </Link>
          <Link to="/#" className="text-gray-800 hover:text-gray-600">
            -July 23,2022
          </Link>
        </div>
        <div className="title">
          <Link
            to="/#"
            className="text-xl font-bold text-gray-800 hover:text-gray-600"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Link>
        </div>
        <Author />
      </div>
    </div>
  );
}

export default Related;
