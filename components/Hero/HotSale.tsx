"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HotSale = () => {
  const [products, setProducts] = useState([]) as any;

  const GetBesSaleProduct = async () => {
    try {
      const res = await fetch("http://localhost:8080/GetBesSaleProduct", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(products);

  useEffect(() => {
    GetBesSaleProduct();
  }, []);

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
            สินค้าขายดี🔥
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
          {products &&
            products.length > 0 &&
            products.map((item: any) => (
              <SwiperSlide
                key={item.ID}
                className="relative hover:shadow-md duration-300 flex flex-col items-center bg-white p-4 rounded-lg mb-6"
              >
                <Link
                  href={`/product/${item.ID}`}
                  className="flex flex-col w-full h-full"
                >
                  <div className="relative mx-auto group md:w-full md:h-[238px] w-[167px] h-[167px]">
                    <Image
                      className="object-cover rounded-md hover:scale-105 transition-all duration-500 w-full h-full"
                      src={item.images?.[0]?.url}
                      alt={item.name}
                      width={380}
                      height={200}
                      priority
                    />
                  </div>

                  <p className="mt-4 text-sm text-gray-800 text-left line-clamp-1 leading-4 font-semibold max-w-[300px]">
                    {item.name}
                  </p>
                  <p className="text-[12px] flex items-center text-[#00000073] text-left leading-4 font-semibold max-w-[300px]">
                    {item.specs?.[0].value} |  {item.specs?.[1].value} | {item.specs?.[3].value} | {item.specs?.[5].value} |  {item.specs?.[11].value} |  {item.specs?.[15].value} |
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

export default HotSale;
