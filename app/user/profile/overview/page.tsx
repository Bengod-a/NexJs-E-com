"use client";

import Navbar from "@/components/Nav/Navbar";
import useStore from "../../../../store/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Page = () => {
  const user = useStore((s) => s.user);
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [formEditUser, setFormEditUser] = useState({
    username: "" as string,
    lastname: "" as string,
    email: "" as string,
    phonenumber: "" as string,
  });
  const path = usePathname();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormEditUser((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const hdlSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/edituser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            ...formEditUser,
          id: user?.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        useStore.setState((state:any) => ({
          user: {
            ...state.user,
            ...formEditUser,
          },
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setFormEditUser({
        username: user.username || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phonenumber: user.phonenumber || "",
      });
    }
  }, [user]);

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
            <h1 className="text-4xl font-bold">บัญชีของฉัน</h1>
            <p className="text-gray-500 mt-1">
              จัดการบัญชีและตรวจสอบข้อมูลธุรกรรมของคุณ
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-10 ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-[460px] mx-auto backdrop-blur-sm rounded-xl p-6 shadow-lg relative overflow-hidden border border-transparent"
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
              className="w-full"
            >
              <form onSubmit={hdlSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ชื่อ
                    </label>
                    <div className="relative">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={formEditUser.username}
                        placeholder="ชื่อ"
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                      />
                      <Icon
                        icon="mdi:account"
                        width="20"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      นามสกุล
                    </label>
                    <div className="relative">
                      <input
                        id="lastname"
                        name="lastname"
                        value={formEditUser.lastname}
                        type="text"
                        onChange={handleChange}
                        placeholder="นามสกุล"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                      />
                      <Icon
                        icon="mdi:account-outline"
                        width="20"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="phonenumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      เบอร์โทรศัพท์
                    </label>
                    <div className="relative">
                      <input
                        id="phonenumber"
                        name="phonenumber"
                        type="number"
                        onChange={handleChange}
                        value={formEditUser.phonenumber}
                        placeholder="เบอร์โทรศัพท์"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                      />
                      <Icon
                        icon="mdi:phone"
                        width="20"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      อีเมล
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={formEditUser.email}
                        placeholder="อีเมล"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                      />
                      <Icon
                        icon="mdi:email"
                        width="20"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    แก้ไขข้อมูลส่วนตัว
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
