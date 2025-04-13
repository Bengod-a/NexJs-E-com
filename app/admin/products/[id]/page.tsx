"use client";

import React, { useEffect, useState } from "react";
import NavBarAdmin from "../../../../components/admin/NavbarAdmin";
import { Icon } from "@iconify/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    quantity: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]) as any;
  const [imageFiles, setImageFiles] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [isupload, setIsupload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isdeleteimage, setIsdeleteimage] = useState(false);

  const getProductById = async () => {
    try {
      const res = await fetch(`http://localhost:8080/products/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setSpecs(data.specs);
      if (data && data.data && data.data.length > 0) {
        const product = data.data[0];
        setSpecs(product.specs);
        setProductData({
          name: product.name || "",
          price: product.price ? product.price.toString() : "",
          quantity: product.quantity ? product.quantity.toString() : "",
          categoryId: product.categories[0]?.ID
            ? product.categories[0].ID.toString()
            : "",
        });
        setExistingImages(product.images || []);
      } else {
        toast.error("ไม่พบสินค้า");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/category", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getProductById();
      getCategories();
    }
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProductData((e) => ({
      ...e,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: any) => {
    const files: any = Array.from(e.target.files);
    setImageFiles(files);

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

  const handleDeleteExistingImage = async (imageId: any) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรูปภาพนี้?")) return;
    setIsdeleteimage(true);
    const toastId = toast.loading("กำลังลบรูปและสินค้า...");
    try {
      const res = await fetch(
        `http://localhost:8080/removeimageinproduct/${imageId.ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            urls: [imageId.url],
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.dismiss(toastId);
        toast.success(data.message);
        setExistingImages(
          existingImages.filter((item: any) => item.ID !== imageId.ID)
        );
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsdeleteimage(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("quantity", productData.quantity);
      formData.append("categoryId", productData.categoryId);

      if (imageUrl) {
        imageUrl.forEach((file: any) => {
          formData.append("images", file);
        });
      }

      const res = await fetch(`http://localhost:8080/products/${id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("แก้ไขสินค้าสำเร็จ!");
        router.push("/admin/products");
      } else {
        toast.error(data.error);
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBarAdmin />
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <header className="max-w-4xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-gray-900">แก้ไขสินค้า</h2>
          <p className="mt-2 text-gray-600">แก้ไขข้อมูลสินค้าในระบบ</p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
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
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition duration-200"
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
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition duration-200"
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
                      value={productData.quantity}
                      onChange={handleChange}
                      placeholder="จำนวนสินค้า"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition duration-200"
                      required
                    />
                    <Icon
                      icon="mdi:cart"
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
                    <select
                      id="categoryId"
                      name="categoryId"
                      value={productData.categoryId}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 appearance-none transition duration-200 bg-white"
                      required
                    >
                      <option value="">เลือกหมวดหมู่</option>
                      {categories.map((category: any) => (
                        <option key={category.ID} value={category.ID}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {productData.categoryId && categories.length > 0 ? (
                      <Icon
                        icon={
                          categories.find(
                            (item: any) =>
                              item.ID.toString() === productData.categoryId
                          )?.icon || "mdi:tag"
                        }
                        width="20"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    ) : (
                      <Icon
                        icon="mdi:tag"
                        width="20"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    )}
                    <Icon
                      icon="mdi:chevron-down"
                      width="20"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <Icon
                      icon="mdi:chevron-down"
                      width="20"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                              width={200}
                              height={200}
                              src={url}
                              alt={`ตัวอย่างรูปภาพ ${index + 1}`}
                              className="w-full h-auto object-cover rounded-md border border-gray-200"
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
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <Icon icon="mdi:content-save" width="20" />
                  บันทึกการเปลี่ยนแปลง
                </button>
              </div>
            </form>
            {existingImages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  รูปภาพที่มีอยู่
                </h3>
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                          รูปภาพ
                        </th>
                        <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                          การจัดการ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {existingImages.map((image: any) => (
                        <tr key={image.ID} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <Link href={image.url} target="_blank">
                              <img
                                src={image.url}
                                alt="รูปภาพสินค้า"
                                className="w-16 h-16 object-cover rounded-md border border-gray-200"
                              />
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteExistingImage(image)}
                              className="p-2 text-red-600 hover:text-red-800"
                            >
                              <Icon icon="mdi:delete" width="20" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="mt-10">
              <h1 className="text-2xl font-bold text-gray-900">
                คุณสมบัติสินค้า
              </h1>
              {specs ? (
                specs.map((specs: any, index) => (
                  <div key={index} className="flex mt-5 items-center gap-2">
                    <input
                      type="text"
                      placeholder="Key"
                      value={specs.key}
                      readOnly
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={specs.value}
                      readOnly
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                ))
              ) : (
                <div>ไม่ได้เพิ่มคุณสมบัติสินค้า</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;
