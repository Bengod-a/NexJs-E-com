"use client";

import Navbar from "@/components/Nav/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import useStore from "../../../../../store/store";
import {
  GetAmphure,
  GetProvince,
  Gettambon,
} from "../../../../../lib/GetProvince";
import { toast } from "react-toastify";

const Page = () => {
  const user = useStore((s) => s.user);
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState<any[]>([]);
  const [amphure, setAmphure] = useState<any[]>([]);
  const [tambon, setTambon] = useState<any[]>([]);
  const [zipcode, setZipcode] = useState<string>("");
  const [data, setData] = useState({
    address: "",
    province: "",
    amphure: "",
    tambon: "",
    zipcode: "",
  });
  const path = usePathname();


  const hdlSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          address: data.address,
          province: data.province,
          amphure: data.amphure,
          tambon: data.tambon,
          zipcode: data.zipcode,
          id: user?.id,
        }),
      });
      const resdata = await res.json();
      if (res.ok) {
        useStore.setState((s: any) => ({
          user: {
            ...s.user,
            address: [...(s.user.address || []), resdata.data],
          },
        }));
        toast.success(resdata.message);
        router.push('/user/profile/address')
      } else {
        toast.error(resdata.message);
      }
      console.log(resdata);
    } catch (error) {
      console.log(error);
    }
  };

  const GetData = () => {
    GetProvince()
      .then((res: any) => {
        setProvince(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const SelectProvince = async (e: any) => {
    const selectedId = e.target.value;
    const index = e.nativeEvent.target.selectedIndex;
    const label = e.nativeEvent.target.options[index].text;
    setData((prev) => ({
      ...prev,
      province: label,
      amphure: "",
      tambon: "",
      zipcode: "",
    }));
    const amphures = await GetAmphure(selectedId);
    setAmphure(amphures);
  };

  const SelectAmphure = async (e: any) => {
    const selectedId = e.target.value;
    const index = e.nativeEvent.target.selectedIndex;
    const label = e.nativeEvent.target.options[index].text;
    setData((prev) => ({ ...prev, amphure: label, tambon: "", zipcode: "" }));
    const tambons = await Gettambon(selectedId);
    setTambon(tambons);
  };

  const SelectTamboon = (e: any) => {
    const selectedId = parseInt(e.target.value);
    const index = e.nativeEvent.target.selectedIndex;
    const label = e.nativeEvent.target.options[index].text;

    const selected = tambon.find((item: any) => item.id === selectedId);
    const zip = selected?.zip_code || "";

    setData((prev) => ({
      ...prev,
      tambon: label,
      zipcode: zip,
    }));
  };

  useEffect(() => {
    setIsHydrated(true);
    GetData();
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
              className="md:w-[460px] w-[350px] mx-auto backdrop-blur-sm rounded-xl p-6 shadow-lg relative overflow-hidden border border-transparent"
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
                      path === "/user/profile/address/create"
                        ? "bg-gray-900"
                        : ""
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
              className="w-full mx-auto"
            >
              <form onSubmit={hdlSubmit} className="space-y-5">
                <div className="w-full  min-w-[200px]">
                  <label className="block mb-1 text-sm text-slate-800">
                    ที่อยู่
                  </label>
                  <div className="relative w-full">
                    <input
                      name="address"
                      value={data.address}
                      onChange={(e) =>
                        setData({ ...data, address: e.target.value })
                      }
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none "
                      type="text"
                    />
                    <Icon
                      icon="gg:select"
                      width="24"
                      height="24"
                      className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                    />
                  </div>
                </div>

                <div className="w-full  min-w-[200px]">
                  <label className="block mb-1 text-sm text-slate-800">
                    จังหวัด
                  </label>
                  <div className="relative w-full">
                    <select
                      defaultValue=""
                      onChange={(e: any) => SelectProvince(e)}
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    >
                      <option value="">-- กรุณาเลือกจังหวัด --</option>
                      {province &&
                        province.map((item: any, i: any) => (
                          <option key={i} value={item.id}>
                            {item.name_th}
                          </option>
                        ))}
                    </select>
                    <Icon
                      icon="gg:select"
                      width="24"
                      height="24"
                      className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                    />
                  </div>
                </div>

                <div className="w-full  min-w-[200px]">
                  <label className="block mb-1 text-sm text-slate-800">
                    อำเภอ
                  </label>
                  <div className="relative w-full">
                    <select
                      defaultValue=""
                      onChange={(e: any) => SelectAmphure(e)}
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    >
                      <option value="">-- กรุณาเลือกอำเภอ --</option>
                      {amphure &&
                        amphure.map((item: any, i: any) => (
                          <option key={i} value={item.id}>
                            {item.name_th}
                          </option>
                        ))}
                    </select>
                    <Icon
                      icon="gg:select"
                      width="24"
                      height="24"
                      className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                    />
                  </div>
                </div>

                <div className="w-full  min-w-[200px]">
                  <label className="block mb-1 text-sm text-slate-800">
                    ตำบล
                  </label>
                  <div className="relative w-full">
                    <select
                      defaultValue=""
                      onChange={(e: any) => SelectTamboon(e)}
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    >
                      <option value="">-- กรุณาเลือกตำบล --</option>
                      {tambon &&
                        tambon.map((item: any, i: any) => (
                          <option key={i} value={item.id}>
                            {item.name_th}
                          </option>
                        ))}
                    </select>
                    <Icon
                      icon="gg:select"
                      width="24"
                      height="24"
                      className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                    />
                  </div>
                </div>

                <div className="w-full  min-w-[200px]">
                  <label className="block mb-1 text-sm text-slate-800">
                    รหัสไปรษณีย์
                  </label>
                  <div className="relative w-full">
                    <input
                      value={data.zipcode}
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-not-allowed"
                      type="number"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    เพิ่มที่อยู่
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
