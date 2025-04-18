"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Header from "../../components/Nav/Navbar";
import { motion } from "framer-motion";
import useStore from "../../store/store";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const page = () => {
  const { user }: any = useStore();
  const productOnCart = user?.productOnCart || [];
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedpayment, setSelectedpayment] = useState<number | null>(null);

  const Saveoptions = async () => {
    if (!selected || !selectedpayment) {
      toast.warning("กรุณาเลือก รูปแบบการจัดส่ง หรือ ช่องทางการชำระเงิน");
      return;
    }
    localStorage.setItem(
      "myOptions",
      JSON.stringify({
        delivery: selected,
        payment: selectedpayment,
      })
    );
  };

  const options = [
    {
      id: 1,
      name: "แบบธรรมดา",
      icon: "carbon:delivery-truck",
      desc: "ส่งภายใน 3-5 วัน",
    },
    {
      id: 2,
      name: "แบบด่วน",
      icon: "material-symbols-light:delivery-truck-speed-outline",
      desc: "ส่งภายใน 1 วัน",
    },
  ];

  const optionspayment = [
    {
      id: 1,
      name: "บัตรเครดิต/เดบิต",
      icon: "ic:sharp-payment",
    },
    {
      id: 2,
      name: "จัดส่งแบบปลายทาง",
      icon: "material-symbols-light:payments",
    },
    {
      id: 3,
      name: "ซองทรูมันนี่",
      icon: "arcticons:truemoney",
    },
  ];

  return (
    <>
      <Header />
      <div className="w-full mt-14 px-5">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex  max-w-[760px] items-center justify-between">
              <h1 className="text-2xl flex items-center gap-2 font-semibold mb-4">
                <Icon icon="ph:map-pin-light" width="30" height="30" />
                ที่อยู่จัดส่ง
              </h1>
              <Link
                href={"/user/profile/address"}
                className="text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-md duration-300 font-semibold"
              >
                จัดการที่อยู่จัดส่ง
              </Link>
            </div>
          </motion.div>
          <div className="flex w-auto flex-col lg:flex-row gap-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex-1 w-full max-w-[760px] mt-5 space-y-4 lg:mx-0 mx-auto  rounded-xl"
            >
              <div>
                {user?.address?.length > 0 ? (
                  <div className="border-1 p-4 border-slate-300 rounded-md">
                    <h1>
                      {user.username} {user.lastname} - {user.phonenumber}
                    </h1>
                    <div className="text-slate-600">
                      {user.address[0].address} {user.address[0].province}
                      {user.address[0].amphure} {user.address[0].tambon}
                      {user.address[0].zipcode}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1>ไม่มี</h1>
                  </div>
                )}
              </div>
              <div className="grid gap-4">
                <div className="flex items-center">
                  <h1 className="text-2xl flex gap-2 items-center font-semibold">
                    <Icon icon="carbon:delivery-truck" width="32" height="32" />
                    รูปแบบการจัดส่ง
                  </h1>
                </div>
                {options.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelected(item.id)}
                    className={`cursor-pointer border p-4 rounded-lg transition ${
                      selected === item.id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <Icon icon={item.icon} width="24" height="24" />
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              {/* ช่องทางการชำระเงิน */}
              <div className="grid gap-4">
                <div className="flex items-center">
                  <h1 className="text-2xl flex gap-2 items-center font-semibold">
                    <Icon
                      icon="fluent:payment-28-regular"
                      width="32"
                      height="32"
                    />
                    ช่องทางการชำระเงิน
                  </h1>
                </div>
                {optionspayment.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedpayment(item.id)}
                    className={`cursor-pointer border p-4 rounded-lg transition ${
                      selectedpayment === item.id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <h3 className="font-bold gap-2 flex items-center">
                      <Icon icon={item.icon} width="24" height="24" />{" "}
                      {item.name}
                    </h3>
                  </div>
                ))}
              </div>
              {/* ช่องทางการชำระเงิน */}
            </motion.div>
            {user && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="w-full max-w-[320px] mx-auto h-fit sticky top-20 self-start"
              >
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="mb-1">
                    <h1 className="mt-2 cursor-pointer w-full text-2xl  text-black font-medium py-2 rounded">
                      สรุปคำสั่งซื้อ
                    </h1>
                  </div>
                  <div className="border-t border-t-slate-200 text-sm">
                    {productOnCart &&
                      productOnCart.length &&
                      productOnCart.map((item: any, i: any) => (
                        <div
                          key={i}
                          className="mt-2 border-b p-2 border-b-slate-200 flex items-center gap-2"
                        >
                          <div>
                            <Image
                              src={item.product.images?.[0].url}
                              alt="Product"
                              width={60}
                              height={60}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span>{item.product.name}</span>
                            <div className="flex items-center justify-between w-full">
                              <span className="text-red-500">
                                ฿{item?.product?.price?.toLocaleString()}
                              </span>
                              <span className="text-slate-700">
                                x{item.count}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    <p className="flex justify-between mt-4">
                      <span>ยอดรวม</span>
                      <span>฿{user?.carts?.toLocaleString()}</span>
                    </p>
                    <p className="flex justify-between text-red-500">
                      <span>ส่วนลด</span>
                      <span>- ฿0</span>
                    </p>
                    <p className="flex justify-between font-bold text-base mt-2">
                      <span>ยอดรวมสุทธิ</span>
                      {/* <span>฿{cartTotal.toLocaleString()}</span> */}
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <Link
                      onClick={Saveoptions}
                      href={"/checkout"}
                      className="mt-4 w-full text-center cursor-pointer bg-red-600 hover:bg-red-500 text-white font-semibold p-2 rounded"
                    >
                      ดำเนินการสั่งซื้อ
                    </Link>
                  </div>

                  <div className="mt-4 text-xs text-gray-500 bg-yellow-50 p-2 rounded">
                    โปรโมชั่นอาจมีการเปลี่ยนแปลง ตรวจสอบอีกครั้งก่อนชำระเงิน
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
