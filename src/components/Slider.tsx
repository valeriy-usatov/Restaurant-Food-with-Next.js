'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const data = [
  {
    id: 1,
    title: 'always fresh & always crispy & always hot',
    image: '/slide1.png',
  },
  {
    id: 2,
    title: 'we deliver your order wherever you are in NY',
    image: '/slide2.png',
  },
  {
    id: 3,
    title: 'the best pizza to share with your family',
    image: '/slide3.jpg',
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-96px)] md:h-[calc(100vh-144px)] flex flex-col lg:flex-row relative ">
      {/* TEXT CONTAINER */}
      <div className="h-1/2 lg:h-full w-full lg:w-1/2 bg-fuchsia-50 flex flex-col items-center justify-center gap-8 text-red-500 font-bold">
        <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {data[current].title}
        </h1>
        <Link href="/menu" className="bg-red-500 text-white py-4 px-8">Order Now</Link>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="w-full lg:w-1/2 relative h-1/2 lg:h-full">
        <Image
          src={data[current].image}
          alt="slider"
          fill
          sizes="100%"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
};

export default Slider;
