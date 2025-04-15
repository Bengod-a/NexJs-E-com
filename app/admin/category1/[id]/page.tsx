"use client";

import React, { useEffect, useState } from "react";
import NavBarAdmin from "../../../../components/admin/NavbarAdmin";
import { Icon } from "@iconify/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Category {
  ID: number;
  icon: string;
  name: string;
  products: Product[];
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

interface Product {
  ID: number;
  name: string;
  price: number;
  quantity: number;
  sold: number;
  images: { ID: number; url: string }[];
}

const page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [icon, setIcon] = useState("");

  const getCategoryId = async () => {
    try {
      const res = await fetch(`http://localhost:8080/category/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setCategories([data.data]);
        setCategoryName(data.data.name || "");
        setIcon(data.data.icon || "");
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hdlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/category/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          categoryName: categoryName,
          icon: icon,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("อัพเดทข้อมูลสำเร็จ");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getCategoryId();
    }
  }, []);

  return (
    <>
      <NavBarAdmin />
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <header className="max-w-4xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-gray-900">แก้ไขหมวดหมู่</h2>
          <p className="mt-2 text-gray-600">แก้ไขข้อมูลหมวดหมู่ในระบบ</p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <div>
              <form
                onSubmit={hdlSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="relative">
                  <label
                    htmlFor="categoryName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    ชื่อหมวดหมู่
                  </label>
                  <div className="relative">
                    <input
                      id="categoryName"
                      name="categoryName"
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="ชื่อหมวดหมู่"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition duration-200 shadow-sm"
                      required
                    />
                    <Icon
                      icon="mdi:tag"
                      width="20"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="icon"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    ไอคอน (Iconify)
                  </label>
                  <div className="relative">
                    <input
                      id="icon"
                      name="icon"
                      type="text"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder='เช่น "bi:gpu-card"'
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition duration-200 shadow-sm"
                      required
                    />
                    <Icon
                      icon={icon || "mdi:tag"}
                      width="20"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    ใช้รหัสไอคอนจาก{" "}
                    <a
                      href="https://icon-sets.iconify.design/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Iconify
                    </a>
                    เช่น "mdi:tag", "bi:gpu-card"
                  </p>
                </div>

                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 transition duration-200 shadow-md"
                  >
                    <Icon icon="mdi:content-save" width="20" />
                    บันทึกการเปลี่ยนแปลง
                  </button>
                </div>
              </form>

              {categories.length > 0 &&
                categories[0]?.products &&
                categories[0].products.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      สินค้าที่อยู่ในหมวดหมู่
                    </h3>
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                              รูปภาพ
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                              ชื่อสินค้า
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                              ราคา (บาท)
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                              จำนวน
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                              ขายแล้ว
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {categories[0]?.products.map((product) => (
                            <tr
                              key={product.ID}
                              onClick={() =>
                                router.push(`/admin/products/${product.ID}`)
                              }
                              className="hover:bg-gray-50 cursor-pointer"
                            >
                              <td className="px-6 py-4">
                                {product.images && product.images.length > 0 ? (
                                  <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                  />
                                ) : (
                                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200">
                                    <Icon
                                      icon="mdi:image-off"
                                      width="24"
                                      className="text-gray-400"
                                    />
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 text-gray-900">
                                {product.name}
                              </td>
                              <td className="px-6 py-4 text-gray-600">
                                {product.price.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 text-gray-600">
                                {product.quantity}
                              </td>
                              <td className="px-6 py-4 text-gray-600">
                                {product.sold}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
