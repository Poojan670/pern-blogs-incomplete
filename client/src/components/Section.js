import React from "react";
import { Link } from "react-router-dom";
import Author from "./sub-components/Author";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import classNames from "classnames";

export default function Section({ theme }) {
  SwiperCore.use([Autoplay]);

  // const bg = {
  //   background: "url('images/banner.png')no-repeat",
  //   backgroundPosition: "right",
  // };
  return (
    <section
      className={classNames("py-16", theme === "dark" && "bg-gray-800")}
      // style={bg}
    >
      <div className="container mx-auto md:px-20">
        <h1
          className={classNames(
            "font-bold text-4xl pb-12 text-center",
            theme === "dark" && "text-slate-300"
          )}
        >
          Trending
        </h1>
        <Swiper
          slidesPerView={1}
          loop={true}
          speed={600}
          autoplay={{
            delay: 5000,
          }}
        >
          <SwiperSlide>
            <Slide theme={theme} />
          </SwiperSlide>
          <SwiperSlide>
            <Slide theme={theme} />
          </SwiperSlide>
          <SwiperSlide>
            <Slide theme={theme} />
          </SwiperSlide>
          <SwiperSlide>
            <Slide theme={theme} />
          </SwiperSlide>
          <SwiperSlide>
            <Slide theme={theme} />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

function Slide({ theme }) {
  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link to="/posts">
          <img src="images/gintoki.png" alt="" width={600} height={600} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="category">
          <Link to="/posts" className="text-orange-600 hover:text-orange-800">
            Business Travel
          </Link>
          <Link
            to="/posts"
            className={classNames(
              "text-gray-800 hover:text-gray-600",
              theme === "dark" && "text-slate-300 hover:text-gray-400"
            )}
          >
            -July 23,2022
          </Link>
        </div>
        <div className="title">
          <Link
            to="/posts"
            className={classNames(
              "text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600",
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
