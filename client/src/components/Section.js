import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Author from "./sub-components/Author";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import * as API from "../dashboard/Redux/Blogs/api";
import classNames from "classnames";
import moment from "moment";

export default function Section({ theme }) {
  SwiperCore.use([Autoplay]);

  const [trendingBlogs, setTrendingBlogs] = useState([]);

  useEffect(() => {
    const blogs = async () => {
      const blogsList = await API.getTrendingPosts();
      setTrendingBlogs(blogsList.data.results);
    };
    blogs().catch((e) => console.log(e.msg));
  }, []);

  const bg = {
    background:
      theme === "dark"
        ? "url('images/test.png') top no-repeat"
        : //
          "",
    // backgroundPosition: theme === "dark" ? "top" : "right",
    backgroundColor:
      theme === "dark" ? "rgb(31, 41, 55)" : "rgb(249, 250, 251)",
    // backgroundSize: "500px 560px",
  };
  return (
    <section className="py-16 bg-gray-50" style={bg}>
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
          {trendingBlogs.map((blog, i) => {
            return (
              <SwiperSlide key={i}>
                <Slide theme={theme} blog={blog} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

function Slide({ theme, blog }) {
  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link to={`/blog-details/${blog?.id}/${blog?.categoryId}`}>
          <img src={blog?.img} alt="" width={600} height={600} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div to={`/blog-details/${blog?.id}/${blog?.categoryId}`}>
          <Link
            to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
            className="text-orange-600 hover:text-orange-800"
          >
            {blog?.Category?.title}
          </Link>
          <Link
            to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
            className={classNames(
              "text-gray-800 hover:text-gray-600",
              theme === "dark" && "text-slate-300 hover:text-gray-400"
            )}
          >
            -{moment(blog?.createdAt).fromNow()}
          </Link>
        </div>
        <div className="title">
          <Link
            to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
            className={classNames(
              "text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600",
              theme === "dark" && "text-slate-300"
            )}
          >
            {blog?.title}
          </Link>
        </div>
        <p className="text-gray-500 py-3">
          {blog?.content.length < 300
            ? blog?.content
            : blog?.content?.substring(1, 300) + "..."}
        </p>
        <h1>
          <Author blog={blog} theme={theme} />
        </h1>
      </div>
    </div>
  );
}
