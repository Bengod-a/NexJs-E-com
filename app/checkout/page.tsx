"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Header from "../../components/Nav/Navbar";
import { motion } from "framer-motion";
import useStore from "../../store/store";
import Link from "next/link";

const page = () => {
  const { user }: any = useStore();
  const productOnCart = user?.productOnCart || [];
  console.log(user);

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
                className="text-red-500 font-semibold"
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
            </motion.div>
            {user && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="w-full max-w-[320px] mx-auto h-fit sticky top-20 self-start"
              >
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="mb-4">
                    <h1 className="mt-2 cursor-pointer w-full text-2xl  text-black font-medium py-2 rounded">
                      สรุปคำสั่งซื้อ
                    </h1>
                  </div>
                  <div className="border-t pt-2 text-sm">
                    <p className="flex justify-between">
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
