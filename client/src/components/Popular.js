import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Author from "./sub-components/Author";

const Popular = ({ theme }) => {
  return (
    <section
      className={classNames(
        "container mx-auto md:px-20 py-16",
        theme === "dark" && "bg-gray-800"
      )}
    >
      <h1
        className={classNames(
          "font-bold text-4xl py-12 text-center",
          theme === "dark" && "text-slate-300"
        )}
      >
        Most Popular
      </h1>

      <Swiper slidesPerView={2}>
        <SwiperSlide>
          <Post theme={theme} />
        </SwiperSlide>
        <SwiperSlide>
          <Post theme={theme} />
        </SwiperSlide>
        <SwiperSlide>
          <Post theme={theme} />
        </SwiperSlide>
        <SwiperSlide>
          <Post theme={theme} />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

function Post({ theme }) {
  return (
    <div className="grid">
      <div className="images">
        <Link to="/#">
          <img src="images/gintoki.png" alt="" width={600} height={400} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
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
            className={classNames(
              "text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600",
              theme === "dark" && "text-slate-300"
            )}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Link>
        </div>
        <p className="text-gray-500 py-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          commodi sapiente amet ducimus, corrupti natus temporibus officia,
          voluptates nulla velit rem, vitae labore impedit. Dolor minus
          cupiditate ea reprehenderit.
        </p>
        <h1>
          <Author theme={theme} />
        </h1>
      </div>
    </div>
  );
}

export default Popular;
