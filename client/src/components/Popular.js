import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Author from "./sub-components/Author";
import * as API from "../dashboard/Redux/Blogs/api";
import moment from "moment";

const Popular = ({ theme }) => {
  SwiperCore.use([Autoplay]);
  const [popularBlogs, setPopularBlogs] = useState([]);

  useEffect(() => {
    const blogs = async () => {
      const blogsList = await API.getPopularBlogs();
      setPopularBlogs(blogsList.data.results);
    };
    blogs().catch((e) => console.log(e.msg));
  }, []);
  return (
    <div
      className={classNames("bg-gray-50", theme === "dark" && "bg-gray-800")}
    >
      <section className="container mx-auto md:px-20 py-16">
        <h1
          className={classNames(
            "font-bold text-4xl py-12 text-center",
            theme === "dark" && "text-slate-300"
          )}
        >
          Most Popular
        </h1>

        <Swiper
          slidesPerView={2}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 3000,
          }}
        >
          {popularBlogs.map((blog, i) => {
            return (
              <SwiperSlide key={i}>
                <Post theme={theme} blog={blog} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </div>
  );
};

function Post({ theme, blog }) {
  return (
    <div className="p-20">
      <Link to={`/blog-details/${blog?.id}/${blog?.categoryId}`}>
        <img src={blog?.img} alt="" width={600} height={400} />
      </Link>
      <div className="info flex justify-center flex-col py-4">
        <div>
          <Link
            to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
            className="text-orange-600 hover:text-orange-800"
          >
            {blog?.Category?.title}
          </Link>
          <Link
            to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
            className="text-gray-800 hover:text-gray-600"
          >
            -{moment(blog?.createdAt).fromNow()}
          </Link>
        </div>
        <div className="title">
          <Link
            to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
            className={classNames(
              "text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600",
              theme === "dark" && "text-slate-300"
            )}
          >
            {blog?.title}
          </Link>
        </div>
        <p className="text-gray-500 py-3">
          {blog?.content.length < 200
            ? blog?.content
            : blog?.content?.substring(1, 150) + "..."}
        </p>
        <h1 className="md:absolute md:top-[36rem]">
          <Author theme={theme} blog={blog} />
        </h1>
      </div>
    </div>
  );
}

export default Popular;
