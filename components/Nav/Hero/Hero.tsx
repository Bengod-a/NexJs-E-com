import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0  }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="max-w-[1200px] mx-auto mt-20  rounded-xl"
      >
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={0}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 1,
            },
            500: {
              slidesPerView: 1,
            },
            750: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          }}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full max-w-[1200px] mySwiper  rounded-xl"
        >
          <SwiperSlide className="relative flex items-center justify-center rounded-xl">
            <Image
              className="object-contain transform group-hover:scale-105 transition-transform duration-300 w-full h-auto rounded-xl"
              src="https://cdn.prod.website-files.com/5f2b1efb0f881760ffdc5c96/65293ad388e7f519253c23b6_cuu_mexygabriel_design_banner-scaled.jpg"
              alt=""
              width={1200}
              height={400}
              priority
            />
          </SwiperSlide>

          <SwiperSlide className="relative flex items-center justify-center rounded-xl">
            <Image
              className="object-contain transform group-hover:scale-105 transition-transform duration-300 w-full h-auto rounded-xl"
              src="https://academics.siu.edu/computing-and-technology/_common/images/itec/itec-index-banner.jpg"
              alt=""
              width={1200}
              height={400}
              priority
            />
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </div>
  );
};
export default Hero;
