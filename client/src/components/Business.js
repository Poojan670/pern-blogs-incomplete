import React from 'react'
import Author from './sub-components/Author'

const Business = () => {
    return (
        <section className='container mx-auto md:px-20 py-16'>
            <div className="grid lg:grid-cols-2">
                <div className="item">
                    <h1 className='font-bold text-4xl py-12'>Business</h1>
                    <div className="flex flex-col gap-6">
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                    </div>
                </div>
                <div className="item">
                    <h1 className='font-bold text-4xl py-12'>Travel</h1>
                    <div className="flex flex-col gap-6">
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                    </div>
                </div>
            </div>

        </section>
    )
}

function Post() {
    return (
        <div className='flex gap-5'>
            <div className="image flex flex-col justify-start">
                <a href='/#'>
                    <img src="images/gintoki.png" alt="" width={300} height={250} className="rounded" />
                </a>
            </div>
            <div className='info flex justify-center flex-col'>
                <div className='category'>
                    <a href='/#' className='text-orange-600 hover:text-orange-800'>Business Travel</a>
                    <a href='/#' className='text-gray-800 hover:text-gray-600'>-July 23,2022</a>
                </div>
                <div className='title'>
                    <a href='/#' className='text-xl font-bold text-gray-800 hover:text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</a>
                </div>
                <Author />
            </div>
        </div>
    )
}

export default Business