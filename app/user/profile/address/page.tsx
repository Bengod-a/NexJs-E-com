"use client";

import Navbar from "@/components/Nav/Navbar";
import useStore from "../../../../store/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const Page = () => {
  const user = useStore((s) => s.user);
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/404");
    }
  }, [user, isHydrated]);

  if (!isHydrated) return null;

  return (
    <>
      <Navbar />
      <div className="px-6">
        <div className="max-w-[1400px] mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto flex flex-col items-center"
          >
            <h1 className="text-4xl font-bold">จัดการที่อยู่จัดส่ง</h1>
          </motion.div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-10 ">
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
                  {user?.username} {user?.lastname || ""}
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
                    <Icon icon="raphael:fave" width="24" height="24" />
                    รายการโปรด
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center">
                <div>
                  <h1 className="text-md text-gray-600 font-semibold">
                    คุณยังไม่มีที่อยู่จัดส่ง
                  </h1>
                </div>
                <div className="mt-2">
                  <Link
                    href={"/user/profile/address/create"}
                    className="w-[200px] h-[56px] border-red-500 text-red-600 gap-2 flex items-center justify-center border rounded-md font-bold cursor-pointer"
                  >
                    <Icon
                      icon="line-md:plus"
                      width="24"
                      height="24"
                      color="red"
                    />
                    เพิ่มที่อยู่ใหม่
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
