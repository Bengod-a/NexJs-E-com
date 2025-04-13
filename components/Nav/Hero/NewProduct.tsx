"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const NewProduct = () => {
  const products = [
    {
      id: 1,
      title: "Samsung Galaxy S25 Ultra",
      description: "สมาร์ทโฟนเรือธงรุ่นล่าสุดจาก Samsung พร้อมกล้อง 200MP",
      price: 39900,
      images: [
        {
          url: "https://media-cdn.bnn.in.th/460527/samsung-smartphone-galaxy-s25-ultra-12256-titanium-blue-5g-1-square_medium.jpg",
        },
      ],
    },
    {
      id: 2,
      title: "iPhone 15 Pro Max",
      description: "สมาร์ทโฟนสุดล้ำจาก Apple พร้อมชิป A17 Pro",
      price: 44900,
      images: [
        {
          url: "https://media-cdn.bnn.in.th/460527/samsung-smartphone-galaxy-s25-ultra-12256-titanium-blue-5g-1-square_medium.jpg",
        },
      ],
    },
    {
      id: 3,
      title: "Google Pixel 9",
      description: "สมาร์ทโฟนจาก Google มาพร้อม AI อัจฉริยะ",
      price: 29900,
      images: [
        {
          url: "https://media-cdn.bnn.in.th/460527/samsung-smartphone-galaxy-s25-ultra-12256-titanium-blue-5g-1-square_medium.jpg",
        },
      ],
    },
    {
      id: 4,
      title: "OnePlus 12",
      description: "สมาร์ทโฟนประสิทธิภาพสูงจาก OnePlus",
      price: 32900,
      images: [
        {
          url: "https://media-cdn.bnn.in.th/460527/samsung-smartphone-galaxy-s25-ultra-12256-titanium-blue-5g-1-square_medium.jpg",
        },
      ],
    },
    {
      id: 5,
      title: "Xiaomi 14",
      description: "สมาร์ทโฟนจาก Xiaomi มาพร้อมกล้อง Leica",
      price: 27900,
      images: [
        {
          url: "https://media-cdn.bnn.in.th/460527/samsung-smartphone-galaxy-s25-ultra-12256-titanium-blue-5g-1-square_medium.jpg",
        },
      ],
    },
    {
      id: 6,
      title: "Xiaomi 14",
      description: "สมาร์ทโฟนจาก Xiaomi มาพร้อมกล้อง Leica",
      price: 27900,
      images: [
        {
          url: "https://media-cdn.bnn.in.th/460527/samsung-smartphone-galaxy-s25-ultra-12256-titanium-blue-5g-1-square_medium.jpg",
        },
      ],
    },
  ];

  return (
    <div className="px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 110 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="max-w-[1200px] mx-auto mt-20 rounded-xl"
      >
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            ของใหม่มารายงานตัว🫡
          </h1>
        </div>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 1,
            },
            500: {
              slidesPerView: 2,
            },
            750: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full max-w-[1200px] mt-2 mySwiper rounded-xl"
        >
          {products.map((item) => (
            <SwiperSlide
              key={item.id}
              className="relative hover:shadow-md duration-300 flex flex-col items-center bg-white p-4 rounded-lg mb-6"
            >
              <Link href={`/product/${item.id}`} className="flex flex-col w-full h-full">
                <div className="relative group w-full h-[200px]">
                  <Image
                    className="object-cover rounded-md hover:scale-105 transition-all duration-500 w-full h-full"
                    src={item.images?.[0]?.url}
                    alt={item.title}
                    width={380}
                    height={200}
                    priority
                  />
                </div>

                <p className="mt-4 text-sm text-gray-800 text-left line-clamp-1 leading-4 font-semibold max-w-[300px]">
                  {item.title}
                </p>
                <p className="text-[12px] text-[#00000073] text-left leading-4 font-semibold max-w-[300px]">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center w-full">
                  <span className="text-base font-bold text-red-500">
                    ฿{item.price.toLocaleString()}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default NewProduct;