"use client";

import Link from "next/link";
import Header from "../../../../components/Nav/Navbar";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter } from "next/navigation";
import useStore from "../../../../store/store";
import { useEffect, useState } from "react";
import Image from "next/image";

const page = () => {
  const path = usePathname();
  const router = useRouter();
  const user = useStore((s) => s.user);
  const [isHydrated, setIsHydrated] = useState(false);
  const [favorites, setfavorites] = useState([]);
  const favorite = user?.favorite;
  const favoriteID = favorite?.map((item: any) => item.favoriteID).join(",");

  const GetFavorite = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/favorite?favoriteid=${favoriteID}&id=${user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setfavorites(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(favorites);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && user) {
      GetFavorite();
      console.log(favoriteID);
    }
  }, [user, isHydrated]);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/");
    }
  }, [user, isHydrated]);

  if (!isHydrated) return null;

  return (
    <>
      <Header />
      <div className="px-6 bg-slate-50">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto  flex flex-col items-center"
          >
            <h1 className="text-4xl flex  mt-20 items-center justify-center gap-2 font-bold">
              <Icon icon="line-md:heart" width="36" height="36" /> รายการโปรด
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mt-20 grid-cols-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="md:w-[460px] w-[350px]  mx-auto backdrop-blur-sm rounded-xl p-6 shadow-lg relative overflow-hidden border border-transparent"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="mx-auto flex flex-col items-center">
                <div className="w-[88px] h-[88px] rounded-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-600 font-medium text-center">
                    {user?.username
                      ? user?.username.replace(/\s/g, "").slice(0, 2)
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
                <h2 className="text-xl font-semibold ">
                  {user?.username} {user?.lastname}
                </h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                <p className="text-gray-600 text-sm mt-1">
                  เบอร์โทร: {user?.phonenumber || " - "}
                </p>
                <div className="my-4 h-[1px] bg-gray-500 w-full"></div>
                <div className="w-full flex flex-col gap-2">
                  <Link
                    className={` gap-2 flex items-center justify-center p-2 rounded-md text-white ${
                      path === "/user/profile/overview"
                        ? "bg-gray-900"
                        : "bg-gray-500"
                    }`}
                    href="/user/profile/overview"
                  >
                    <Icon icon="mdi:user" width="24" height="24" />
                    ข้อมูลส่วนตัว
                  </Link>
                  <Link
                    className={`bg-gray-500 gap-2 flex items-center justify-center p-2 rounded-md text-white ${
                      path === "/user/profile/address" ? "bg-gray-900" : ""
                    }`}
                    href="/user/profile/address"
                  >
                    <Icon icon="tabler:map-pin-filled" width="24" height="24" />
                    จัดการที่อยู่จัดส่ง
                  </Link>
                  <Link
                    className={`bg-gray-500 gap-2 flex items-center justify-center p-2 rounded-md text-white ${
                      path === "/user/profile/order" ? "bg-gray-900" : ""
                    }`}
                    href="/user/profile/order"
                  >
                    <Icon
                      icon="solar:bill-list-outline"
                      width="24"
                      height="24"
                    />
                    คำสั่งชื้อ
                  </Link>
                  <Link
                    className={`bg-gray-500 gap-2 flex items-center justify-center p-2 rounded-md text-white ${
                      path === "/user/profile/favorite" ? "bg-gray-900" : ""
                    }`}
                    href="/user/profile/favorite"
                  >
                    <Icon
                      icon="raphael:fave"
                      width="24"
                      height="24"
                      color="red"
                    />
                    รายการโปรด
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full"
            >
              <div className="grid grid-cols-1">
                {favorites &&
                  favorites.length > 0 &&
                  favorites.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="bg-white flex border-b-1 p-4 rounded-md border-b-slate-200"
                    >
                      <div>
                        <Image
                          src={item.product?.images?.[0].url}
                          alt="Product"
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className="md:space-y-0 space-y-4 flex md:flex-row flex-col lg:gap-4">
                        <p className="md:max-w-[380px] text-[14px] md:text-[16px]">
                          {item.product.name}
                        </p>
                        <p className="text-red-500 font-semibold text-[14px] md:text-[16px]">
                          ฿{item.product?.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-6">
                          <Link
                            href={`/product/${item.product.ID}`}
                            className="bg-red-500 h-[42px] w-[170px]  flex items-center justify-center text-white rounded-md"
                          >
                            หยิบใส่ตะกร้า
                          </Link>
                          <button className="hover:scale-110 cursor-pointer transition-all duration-300">
                            <Icon
                              icon="mingcute:delete-line"
                              width="24"
                              height="24"
                              className="text-slate-400"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
