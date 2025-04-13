"use client";

import React from "react";
import NavBarAdmin from "../../components/admin/NavbarAdmin";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 600 },
  { month: "Mar", sales: 800 },
  { month: "Apr", sales: 500 },
  { month: "May", sales: 700 },
  { month: "Jun", sales: 650 },
  { month: "Jul", sales: 900 },
  { month: "Aug", sales: 750 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const topProducts = [
  { name: "iPhone 15 Pro Max", sold: 120 },
  { name: "Samsung Galaxy S24", sold: 95 },
  { name: "Xiaomi 14 Ultra", sold: 82 },
  { name: "ASUS ROG Phone 7", sold: 60 },
  { name: "Nothing Phone (2)", sold: 48 },
];

const DashboardPage = () => {
  return (
    <>
      <NavBarAdmin />
      <div className="py-4 px-4 md:px-20">
        <div className="flex mt-10 items-start">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "PRODUCTS",
                value: "249",
                icon: "mdi:package-variant-closed",
                bg: "bg-blue-600",
              },
              {
                title: "CATEGORIES",
                value: "25",
                icon: "mdi:triangle",
                bg: "bg-orange-500",
              },
              {
                title: "CUSTOMERS",
                value: "1500",
                icon: "mdi:account-group",
                bg: "bg-green-600",
              },
              {
                title: "ขายแล้ว",
                value: "56",
                icon: "mdi:bell",
                bg: "bg-red-600",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className={`${item.bg} p-4 sm:p-6 rounded-lg flex items-center justify-between shadow-md min-w-0`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Icon
                    icon={item.icon}
                    width="20"
                    className="text-white sm:w-6"
                  />
                  <h1 className="text-white text-base sm:text-lg font-semibold">
                    {item.title}
                  </h1>
                </div>
                <span className="text-white text-xl sm:text-2xl font-bold">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">ยอดขายรายเดือน</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full h-72 bg-white shadow-md rounded-lg p-4"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">สินค้าขายดี</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <ul className="space-y-3">
              {topProducts.map((product, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b pb-2 last:border-b-0"
                >
                  <div className="flex items-center space-x-2">
                    <Icon
                      icon="material-symbols:star"
                      width="24"
                      height="24"
                      color="yellow"
                    />
                    <span className="text-gray-800">{product.name}</span>
                  </div>
                  <span className="text-blue-600 font-semibold">
                    {product.sold} ชิ้น
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
