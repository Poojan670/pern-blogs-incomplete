import React from 'react'
import Author from './sub-components/Author'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/css'


export default function Section() {

    SwiperCore.use([Autoplay])

    const bg = {
        background: "url('images/banner.png')no-repeat",
        backgroundPosition: "right"
    }
    return (
        <section className='py-16' style={bg}>
            <div className='container mx-auto md:px-20'>
                <h1 className='font-bold text-4xl pb-12 text-center'>Trending</h1>
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    speed={600}
                    autoplay={{
                        delay: 5000
                    }}
                >
                    <SwiperSlide><Slide /></SwiperSlide>
                    <SwiperSlide><Slide /></SwiperSlide>
                    <SwiperSlide><Slide /></SwiperSlide>
                    <SwiperSlide><Slide /></SwiperSlide>
                    <SwiperSlide><Slide /></SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}

function Slide() {
    return (
        <div className='grid md:grid-cols-2'>
            <div className='image'>
                <a href='/posts'>
                    <img src="images/gintoki.png" alt="" width={600} height={600} />
                </a>

            </div>
            <div className='info flex justify-center flex-col'>
                <div className='category'>
                    <a href='/posts' className='text-orange-600 hover:text-orange-800'>Business Travel</a>
                    <a href='/posts' className='text-gray-800 hover:text-gray-600'>-July 23,2022</a>
                </div>
                <div className='title'>
                    <a href='/posts' className='text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</a>
                </div>
                <p className='text-gray-500 py-3'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui commodi sapiente amet ducimus, corrupti natus temporibus officia, voluptates nulla velit rem, vitae labore impedit. Dolor minus cupiditate ea reprehenderit.
                </p>
                <h1><Author /></h1>
            </div>

        </div>
    )
}