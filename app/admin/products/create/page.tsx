"use client";

import React, { useEffect, useState } from "react";
import NavBarAdmin from "../../../../components/admin/NavbarAdmin";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import useStore from "../../../../store/store";
import Image from "next/image";
import Link from "next/link";

interface Category {
  ID: number;
  icon: string;
  name: string;
}

const page = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    categoryId: "",
    userId: "",
    quantity: "",
  });
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isupload, setIsupload] = useState(false);
  const [newproduct, setNewproduct] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const user = useStore((s) => s.user);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("categoryId", productData.categoryId);
      formData.append("quantity", productData.quantity);
      formData.append("userId", user?.id as any);
      if (imageUrl) {
        imageUrl.forEach((file: any) => {
          formData.append("images", file);
        });
      }

      const res = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("เพิ่มสินค้าสำเร็จ!");
        setProductData({
          name: "",
          price: "",
          categoryId: "",
          userId: "",
          quantity: "",
        });
        setImageUrl([]);
        setNewproduct((e) => [...e, data.data]);
        e.target.querySelector('input[type="file"]').value = null;
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = async (e: any) => {
    const files: any = await Array.from(e.target.files);
    setIsupload(true);
    try {
      const formData = new FormData();
      if (files) {
        files.forEach((file: any) => {
          formData.append("images", file);
        });
      }

      const res = await fetch("http://localhost:8080/uploadimage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      setImageUrl(data.urls);
    } catch (error) {
      console.log(error);
    } finally {
      setIsupload(false);
    }
  };

  const handleRemoveImage = async (index: number) => {
    if (!imageUrl[index]) return;

    const removedImageUrl = imageUrl[index];
    const newImageUrl = imageUrl.filter((_, i) => i !== index);

    setImageUrl(newImageUrl);

    try {
      const res = await fetch("http://localhost:8080/removeimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          urls: [removedImageUrl],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("เกิดข้อผิดพลาดในการลบรูปภาพ");
    }
  };

  useEffect(() => {
    getcategory();
  }, []);

  return (
    <>
      <NavBarAdmin />
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <header className="max-w-4xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-gray-900">เพิ่มสินค้าใหม่</h2>
          <p className="mt-2 text-gray-600">
            กรอกข้อมูลเพื่อเพิ่มสินค้าลงในระบบ
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ชื่อสินค้า
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={productData.name}
                      onChange={handleChange}
                      placeholder="ชื่อสินค้า"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition duration-200"
                      required
                    />
                    <Icon
                      icon="mdi:package-variant-closed"
                      width="20"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ราคา (บาท)
                  </label>
                  <div className="relative">
                    <input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={productData.price}
                      onChange={handleChange}
                      placeholder="ราคา"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition duration-200"
                      required
                    />
                    <Icon
                      icon="mdi:currency-usd"
                      width="20"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="categoryId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    หมวดหมู่
                  </label>
                  <div className="relative">
                    <div className="relative">
                      <select
                        id="categoryId"
                        name="categoryId"
                        value={productData.categoryId}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 appearance-none transition duration-200 bg-white"
                        required
                      >
                        <option value="">เลือกหมวดหมู่</option>
                        {categories.length > 0 &&
                          categories.map((item) => (
                            <option key={item.ID} value={item.ID}>
                              {item.name}
                            </option>
                          ))}
                      </select>

                      {(() => {
                        const selected = categories.find(
                          (item) => item.ID === Number(productData.categoryId)
                        );
                        return selected ? (
                          <Icon
                            icon={selected.icon}
                            width="20"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                        ) : (
                          <Icon
                            icon="mdi:tag"
                            width="20"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                        );
                      })()}

                      <Icon
                        icon="mdi:chevron-down"
                        width="20"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    จำนวนสินค้า
                  </label>
                  <div className="relative">
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      step="0.01"
                      value={productData.quantity}
                      onChange={handleChange}
                      placeholder="จำนวนสินค้า"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition duration-200"
                      required
                    />
                    <Icon
                      icon="mdi:cart-minus"
                      width="20"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="images"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    รูปภาพสินค้า
                  </label>
                  <div className="relative">
                    <input
                      id="images"
                      name="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                  {isupload ? (
                    <div className="mt-4 flex justify-center items-center">
                      <Icon
                        icon="mdi:loading"
                        width="24"
                        className="animate-spin"
                      />
                      <span className="ml-2 text-gray-600">
                        กำลังอัปโหลด...
                      </span>
                    </div>
                  ) : (
                    imageUrl.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {imageUrl.map((url: string, index: number) => (
                          <div key={index} className="relative">
                            <Image
                              width={100}
                              height={100}
                              src={url}
                              alt={`ตัวอย่างรูปภาพ ${index + 1}`}
                              className="w-full h-32 object-cover rounded-md border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <Icon icon="mdi:close" width="16" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  disabled={isupload}
                  type="submit"
                  className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 transition-colors duration-200 ${
                    isupload ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Icon icon="mdi:plus" width="20" />
                  เพิ่มสินค้า
                </button>
              </div>
            </form>
          </div>
          {/*  */}
          <div className="mt-6">
            <h1 className="text-xl font-semibold mb-4">
              🆕 สินค้าที่เพิ่งเพิ่ม
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newproduct.length === 0 ? (
                <p className="text-gray-500">ยังไม่มีสินค้าที่เพิ่งเพิ่ม</p>
              ) : (
                newproduct.map((product: any) => (
                  <Link
                    href={`/admin/products/${product.ID}`}
                    key={product.ID}
                    className="bg-white shadow rounded-lg p-4 transition duration-200 hover:shadow-md"
                  >
                    <div className="w-full h-40 bg-gray-100 rounded mb-3 overflow-hidden">
                      {product.images?.[0]?.url ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          ไม่มีรูปภาพ
                        </div>
                      )}
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h2>

                    <p className="text-blue-600 font-medium">
                      ฿{product.price.toLocaleString()}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      เพิ่มเมื่อ:{" "}
                      {new Date(product.CreatedAt).toLocaleString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default page;
