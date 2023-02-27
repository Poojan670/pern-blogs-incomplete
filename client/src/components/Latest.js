import React from "react";
import Author from "./sub-components/Author";

const Latest = () => {
  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>

      {/* grid columns */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        <Post />
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
    <div className="item">
      <div className="images">
        <a href="/#">
          <img
            src="images/gintoki.png"
            alt=""
            width={500}
            height={350}
            className="rounded"
          />
        </a>
      </div>
      <div className="info flex justify-center flex-col py-4">
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
        <p className="text-gray-500 py-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          commodi sapiente amet ducimus, corrupti natus temporibus officia,
          voluptates nulla velit rem, vitae labore impedit. Dolor minus
          cupiditate ea reprehenderit.
        </p>
        <h1>
          <Author />
        </h1>
      </div>
    </div>
  );
}

export default Latest;
