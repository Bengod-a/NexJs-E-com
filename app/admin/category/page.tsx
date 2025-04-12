"use client";

interface Category {
  ID: number;
  icon: string
  name: string;
  products: { id: number }[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import NavBarAdmin from "../../../components/admin/NavbarAdmin";
import Link from "next/link";
import { toast } from "react-toastify";
import useStore from "../../../store/store";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [icon, setIcon] = useState("");
  const user = useStore((s) => s.user);

  const getcategory = async () => {
    try {
      const res = await fetch("http://localhost:8080/category", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hdlSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          categoryName: categoryName,
          icon: icon,
        }),
      });
      const responseData = await res.json();
      if (res.ok) {
        toast.success("เพิ่มสำเร็จ!");
        setCategoryName("");
        getcategory();
      } else {
        toast.error(responseData.message);
      }
      getcategory();
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    getcategory();
  }, []);

  return (
    <>
      <NavBarAdmin />
      <div className="min-h-screen bg-gray-100 p-6">
        <header className="max-w-4xl mx-auto mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            เพิ่มหมวดหมู่ใหม่
          </h2>
        </header>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <form
              onSubmit={hdlSubmit}
              className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-4"
            >
              <div className="flex-1">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  ชื่อหมวดหมู่
                </label>
                <input
                  id="categoryName"
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="เช่น เสื้อผ้า, อิเล็กทรอนิกส์"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  ชื่อIcon
                </label>
                <input
                  id="icon"
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="icon จาก iconify react"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 transition-colors duration-200"
              >
                <Icon icon="mdi:plus" width="20" />
                เพิ่มหมวดหมู่
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {categories.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">ไม่มีหมวดหมู่</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((item) => (
                <Link
                  key={item.ID}
                  href={`/category/${item.ID}`}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Icon
                        icon={item.icon}
                        width="24"
                        height="24"
                        className="text-gray-600"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.products?.length || 0} รายการ
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddCategory;
