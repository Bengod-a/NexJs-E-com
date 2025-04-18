"use client";
import Header from "../../../components/Nav/Navbar";
import { motion } from "framer-motion";
import useStore from "../../../store/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import Link from "next/link";

const page = () => {
  const { user } = useStore();
  const productOnCart = user?.productOnCart || [];
  const [quantity, setQuantity] = useState<number[]>([]);
  const cartTotal = productOnCart.reduce((total, item, index) => {
    const count = quantity[index] || 1;
    return total + item.product.price * count;
  }, 0);

  const updateQuantity = (index: number, newValue: number) => {
    setQuantity((prev) => {
      const updated = [...prev];
      updated[index] = Math.max(1, newValue);
      return updated;
    });
  };


  const deleteProduct = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/productoncart/${id}`, {
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
            carts: data.cart,
            productOnCart: s.user.productOnCart.filter(
              (item: any) => item.ID !== id
            ),
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

  const payload = productOnCart.map((item: any, index: number) => ({
    productId: item.product.ID,
    quantity: quantity[index] || 1,
  }));
  console.log(payload);

  const updaproductOnCart = async () => {
    const updatedProductOnCart = productOnCart.map((item, i) => ({
      ...item,
      count: quantity[i] || 1,
    }));
    try {
      useStore.setState((s: any) => ({
        user: {
          ...s.user,
          carts: cartTotal,
          productOnCart: updatedProductOnCart,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (productOnCart.length > 0) {
      setQuantity(productOnCart.map((item) => item.count ?? 1));
    }
  }, [productOnCart]);

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
            <h1 className="text-2xl font-semibold mb-4">
              ตะกร้าสินค้า ({productOnCart.length})
            </h1>
          </motion.div>

          <div className="flex w-auto flex-col lg:flex-row gap-2">
            {productOnCart.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex-1 w-full max-w-[760px] mt-20 space-y-4 lg:mx-0 mx-auto  rounded-xl"
              >
                {productOnCart.map((item: any, i: number) => (
                  <div className="flex  items-center " key={i}>
                    <div>
                      <Image
                        src={item.product.images?.[0].url}
                        alt={item.product.name}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="flex justify-between gap-5">
                      <p className="text-[16px] w-[350px] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[16px] transition-all duration-1000 text-red-500 font-semibold">
                        ฿{(item.product.price * quantity[i])?.toLocaleString()}
                      </p>
                      <div className="flex items-center  gap-2">
                        <button
                          className="rounded-md px-2 py-1 cursor-pointer"
                          onClick={() => updateQuantity(i, quantity[i] - 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-[65px] h-[35px] rounded-md  text-center  focus:outline-none focus:border-red-500 no-spinner p-2 border-2 duration-300 border-slate-200"
                          value={quantity[i] ?? ""}
                          min={1}
                          onChange={(e) =>
                            updateQuantity(i, Number(e.target.value))
                          }
                        />
                        <button
                          className="rounded-md px-2 py-1 cursor-pointer"
                          onClick={() => updateQuantity(i, quantity[i] + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="mt-[8px] ml-6">
                      <button
                        onClick={() => deleteProduct(item.ID)}
                        className="hover:scale-110 cursor-pointer transition-all duration-300"
                      >
                        <Icon
                          icon="mingcute:delete-line"
                          width="24"
                          height="24"
                          className="text-slate-400"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center items-center w-full max-w-[1200px] mx-auto p-4 rounded-xl"
              >
                <div className="mx-auto flex flex-col items-center">
                  <div>
                    <Icon
                      icon="bi:cart-x-fill"
                      width="121"
                      height="91"
                      className="text-slate-300"
                    />
                  </div>
                  <div className="mt-10 text-[24px] text-slate-900 font-bold">
                    ไม่มีสินค้าในตะกร้า
                  </div>
                  <div className="mt-1 text-[16px] text-slate-700">
                    คุณไม่มีสินค้าในตะกร้า
                    โปรดเลือกหยิบสินค้าที่ต้องการซื้อลงตะกร้า
                  </div>
                  <Link
                    href={"/"}
                    className="text-red-500 mt-8 hover:text-red-600"
                  >
                    กลับสู่หน้าหลัก
                  </Link>
                </div>
              </motion.div>
            )}

            {productOnCart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="w-full max-w-[320px] mx-auto h-fit sticky top-20 self-start"
              >
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="mb-4">
                    <input
                      className="w-full border border-gray-300 p-2 rounded"
                      placeholder="กรอกคูปองส่วนลด"
                    />
                    <button className="mt-2 cursor-pointer w-full bg-gray-100 text-black font-medium py-2 rounded hover:bg-gray-200">
                      ใช้งาน
                    </button>
                  </div>

                  <div className="border-t pt-2 text-sm">
                    <p className="flex justify-between">
                      <span>ยอดรวม</span>
                      <span>฿{cartTotal?.toLocaleString()}</span>
                    </p>
                    <p className="flex justify-between text-red-500">
                      <span>ส่วนลด</span>
                      <span>- ฿0</span>
                    </p>
                    <p className="flex justify-between font-bold text-base mt-2">
                      <span>ยอดรวมสุทธิ</span>
                      <span>฿{cartTotal.toLocaleString()}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <Link
                      href={"/checkout"}
                      onClick={updaproductOnCart}
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
