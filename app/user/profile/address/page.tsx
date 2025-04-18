"use client";

import Navbar from "@/components/Nav/Navbar";
import useStore from "../../../../store/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Page = () => {
  const user = useStore((s) => s.user);
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const path = usePathname();

  const DeleteAddress = async (id: any) => {
    try {
      const res = await fetch(`http://localhost:8080/address/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: user?.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        useStore.setState((s: any) => ({
          user: {
            ...s.user,
            address: s.user.address.filter((a: any) => a.ID !== id),
          },
        }));

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/");
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
              className="md:w-[460px] h-[460px] w-[350px]  mx-auto backdrop-blur-sm rounded-xl p-6 shadow-lg relative overflow-hidden border border-transparent"
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

            {user?.address && user.address.length === 0 && (
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
            )}

            {user?.address && user.address.length > 0 && (
              <>
                <motion.ul
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h1 className="text-2xl">ที่อยู่ของคุณ</h1>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={"/user/profile/address/create"}
                        className="gap-1 text-red-600  flex items-center text-[13px] justify-center rounded-md hover:bg-red-200 p-2 duration-300 cursor-pointer"
                      >
                        <Icon
                          icon="line-md:plus"
                          width="15"
                          height="15"
                          color="red"
                        />
                        เพิ่มที่อยู่
                      </Link>
                    </div>
                  </div>

                  {user.address.map((item: any, index) => (
                    <React.Fragment key={`address-${index}`}>
                      <li className="mt-4 hover:bg-gray-200 cursor-pointer  duration-300">
                        <div className="flex flex-col p-2">
                          <div className="flex items-center justify-between">
                            <h1 className="text-[16px] text-black">
                              {item.address}
                            </h1>

                            <div className="flex items-center justify-between">
                              <button
                                onClick={() => DeleteAddress(item.ID)}
                                className="text-red-500 hover:bg-red-300 p-1 rounded-full duration-300 text-[13px]"
                              >
                                <Icon
                                  icon="ic:round-delete"
                                  width="20"
                                  height="20"
                                />
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <p className="text-[14px] text-gray-600">
                              เบอร์โทร: {user.phonenumber}
                            </p>
                            <p className="text-[14px] text-gray-600">
                              รายละเอียดที่อยู่: จ.{item.province}, อ.
                              {item.amphure}, ต.{item.tambon} {item.zipcode}
                            </p>
                          </div>
                        </div>
                        <div className="h-[1px] bg-gray-300 mt-4"></div>
                      </li>
                    </React.Fragment>
                  ))}
                </motion.ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
