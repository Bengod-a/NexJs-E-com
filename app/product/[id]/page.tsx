"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../../components/Nav/Navbar";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { FreeMode, Thumbs } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loading from "../../../components/loadeing/Loader";
import { Icon } from "@iconify/react/dist/iconify.js";
import useStore from "../../../store/store";
import { toast } from "react-toastify";

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]) as any;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isloading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const cartTotal = quantity * product.price;
  const user = useStore((s) => s.user);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const GetProductById = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/product/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      setProduct(data.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const AddTocate = async (product: any) => {
    try {
      useStore.setState((s: any) => {
        const currentCarts = Array.isArray(s.user?.carts) ? s.user.carts : [];

        const existingIndex = currentCarts.findIndex(
          (item: any) => item.ID === product.ID
        );

        let updatedCarts;

        if (existingIndex !== -1) {
          const currentQty = currentCarts[existingIndex].quantity;
          if (currentQty + quantity > product.quantity) {
            toast.error("สินค้าไม่พอ");
            return s;
          }
          updatedCarts = [...currentCarts];
          updatedCarts[existingIndex] = {
            ...updatedCarts[existingIndex],
            quantity:
              (updatedCarts[existingIndex].quantity || quantity) + quantity,
            price:
              (updatedCarts[existingIndex].price || product.price) + cartTotal,
          };
        } else {
          updatedCarts = [...currentCarts, { ...product, quantity: 1 }];
        }


        return {
          user: {
            ...s.user,
            carts: updatedCarts,
          },
        };
      });
      const res = await fetch("http://localhost:8080/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productid: product.ID,
          price: product.price,
          quantity: quantity,
          id: user?.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetProductById();
  }, [id]);

  return (
    <>
      <Header />
      {isloading ? (
        <Loading />
      ) : (
        <>
          <div className="px-5">
            <div className="max-w-[1200px] mt-20 mx-auto">
              <div className="grid cursor-pointer xl:grid-cols-2 grid-cols-1 mx-auto">
                <div className="relative my-auto">
                  <Swiper
                    slidesPerView={1}
                    loop={true}
                    navigation={{
                      prevEl: ".custom-swiper-prev",
                      nextEl: ".custom-swiper-next",
                    }}
                    modules={[Autoplay, Pagination, Navigation, Thumbs]}
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    className="mySwiper mx-auto"
                  >
                    {product &&
                      Array.isArray(product.images) &&
                      product.images.map((image: any, index: any) => (
                        <SwiperSlide
                          key={index}
                          className="relative mx-auto flex items-center justify-center"
                        >
                          <Image
                            className="object-contain mx-auto md:w-[402px] md:h-[447px] w-full h-auto rounded-xl transition-transform duration-300 transform group-hover:scale-105"
                            src={image.url}
                            alt={`Product Image ${index + 1}`}
                            width={400}
                            height={400}
                            priority
                          />
                        </SwiperSlide>
                      ))}
                  </Swiper>

                  <div className="custom-swiper-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 text-red-500 bg-gray-100 p-2 rounded-full cursor-pointer">
                    <Icon
                      icon="grommet-icons:previous"
                      width="24"
                      height="24"
                    />
                  </div>
                  <div className="custom-swiper-next absolute top-1/2 right-2 -translate-y-1/2 z-10 text-red-500 bg-gray-100 p-2 rounded-full cursor-pointer">
                    <Icon icon="grommet-icons:next" width="24" height="24" />
                  </div>
                </div>

                <div className="max-w-[564px] mt-16">
                  <div className="flex flex-col">
                    {product && (
                      <div>
                        <h1 className="text-[24px] font-semibold">
                          {product.name}
                        </h1>
                        <p className="text-[16px] text-gray-500 mt-3">
                          {product.description}
                        </p>

                        {product.specs?.[0]?.value && (
                          <ul className="mt-10 list-disc ml-10 text-[16px] text-gray-400">
                            <li className="text-gray-700">
                              {product.specs[0].value}
                            </li>
                            <li className="text-gray-700">
                              แบตเตอรี่ {product.specs[11].value}
                            </li>
                            <li className="text-gray-700">
                              มาพร้อมกล้องความชัดสูงสุด {product.specs[7].value}
                            </li>
                          </ul>
                        )}

                        <div className="mt-10">
                          {product && (
                            <>
                              <h1 className="text-[34px] gap-2 font-bold text-red-500">
                                {product.price && "฿"}
                                {product.price && cartTotal.toLocaleString()}
                              </h1>
                              <p className="text-[12px] flex items-center gap-2 text-gray-500 mt-1">
                                <Icon
                                  icon="arcticons:microsoft-defender"
                                  width="16"
                                  height="16"
                                />
                                {product.price && "รับประกัน 1 ปี"}
                              </p>
                              {product && product.price && (
                                <div className="flex items-center gap-2 mt-4">
                                  <p className="text-slate-400">จำนวน</p>
                                  <div className="flex items-center gap-2">
                                    <button
                                      className="rounded-md px-2 py-1 cursor-pointer"
                                      onClick={decrement}
                                    >
                                      -
                                    </button>
                                    <input
                                      type="number"
                                      className="w-[65px] h-[35px] rounded-md  text-center  focus:outline-none focus:border-red-500 no-spinner p-2 border-2 duration-300 border-slate-200"
                                      value={quantity}
                                      onChange={(e) =>
                                        setQuantity(
                                          Math.max(1, Number(e.target.value))
                                        )
                                      }
                                      min={1}
                                    />
                                    <button
                                      className="rounded-md px-2 py-1 cursor-pointer"
                                      onClick={increment}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {product && product.price && (
                          <>
                            <div className="flex flex-col md:flex-row items-center mt-10 gap-4">
                              <button
                                onClick={() => AddTocate(product)}
                                className="w-full md:w-[274px] h-[50px] border border-red-500 rounded-md cursor-pointer text-red-500 hover:bg-red-500 duration-300 hover:text-white"
                              >
                                หยิบใส่ตะกร้า
                              </button>
                              <button className="w-full md:w-[274px] h-[50px] rounded-md cursor-pointer text-white bg-[#D4001A] duration-300 hover:text-white">
                                ซื้อสินค้า
                              </button>
                            </div>

                            <div className="h-[1px] bg-slate-300 mt-5"></div>

                            <div className="flex flex-col md:flex-row items-center mt-4 gap-8">
                              <button className="flex items-center gap-2 cursor-pointer hover:text-red-500 duration-300">
                                <Icon
                                  icon="la:exchange-alt"
                                  width="20"
                                  height="20"
                                />
                                เปรียบเทียบสินค้า
                              </button>
                              <button className="flex items-center gap-2 cursor-pointer hover:text-red-500 duration-300">
                                <Icon icon="la:heart" width="20" height="20" />
                                เพิ่มเป็นรายการโปรด
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full max-w-[550px]">
                <Swiper
                  onSwiper={setThumbsSwiper as any}
                  slidesPerView={5}
                  spaceBetween={2}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs]}
                  className="cursor-pointer !hidden 2xl:!block"
                >
                  {product &&
                    Array.isArray(product.images) &&
                    product.images.map((image: any, index: any) => (
                      <SwiperSlide key={index}>
                        <Image
                          src={image.url}
                          alt={`${index + 1}`}
                          width={100}
                          height={100}
                          className="rounded-md border-2 border-gray-200 transition-all duration-200"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </div>
          {product && product.specs && (
            <div className="w-full bg-slate-100 mt-20 py-10">
              <div className="max-w-[1200px] mx-auto px-4">
                <h1 className="text-[24px] font-semibold mb-4">
                  คุณสมบัติสินค้า
                </h1>
                <div className="w-full bg-white rounded-md overflow-hidden">
                  {product.specs.map((item: any, i: number) => (
                    <div
                      key={i}
                      className={`flex justify-between px-4 py-3 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }`}
                    >
                      <p className="text-gray-500 w-1/2">{item.key}</p>
                      <p className="font-medium w-1/2 text-start">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default page;
