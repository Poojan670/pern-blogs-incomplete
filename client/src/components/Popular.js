import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Author from "./sub-components/Author";

const Popular = () => {
  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>

      <Swiper slidesPerView={2}>
        <SwiperSlide>
          <Post />
        </SwiperSlide>
        <SwiperSlide>
          <Post />
        </SwiperSlide>
        <SwiperSlide>
          <Post />
        </SwiperSlide>
        <SwiperSlide>
          <Post />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

function Post() {
  return (
    <div className="grid">
      <div className="images">
        <a href="/#">
          <img src="images/gintoki.png" alt="" width={600} height={400} />
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
            className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600"
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

export default Popular;
