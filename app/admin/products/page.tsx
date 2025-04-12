"use client";

import React, { useEffect, useState } from "react";
import NavBarAdmin from "../../../components/admin/NavbarAdmin";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import Link from "next/link";

const ProductListPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [producted, setProducted] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isdeleteimage, setIsdeleteimage] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getProducts = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/products?page=${page}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (data.data) {
        setProducts((prevProducts) => [...prevProducts, ...data.data]);
        if (data.data.length === 0) {
          setHasMore(false);
        }
      } else {
        console.log(data.error);
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (producteds: any) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) return;
    setIsdeleteimage(true);
    const toastId = toast.loading("กำลังลบรูปและสินค้า...");
    setProducted(producted);
    const urls = producteds.images
      ?.map((img: any) => img.url)
      .filter((url: string) => !!url);

    try {
      const res = await fetch(
        `http://localhost:8080/products/${producteds.ID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urls }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.dismiss(toastId);
        toast.success("ลบสินค้าสำเร็จ!");
        setProducts(
          products.filter((product: any) => product.ID !== producteds.ID)
        );
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsdeleteimage(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <>
      <NavBarAdmin />
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">รายการสินค้า</h2>
          <Link
            href="/admin/products/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 transition-colors duration-200"
          >
            <Icon icon="mdi:plus" width="20" /> เพิ่มสินค้า
          </Link>
        </header>

        <div className="max-w-6xl mx-auto hidden md:block">
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
                    หมวดหมู่
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    คงเหลือ
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    ขายแล้ว
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                    การจัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center mx-auto text-gray-500"
                    >
                      ไม่มีสินค้า
                    </td>
                  </tr>
                ) : (
                  products.map((product: any) => (
                    <tr key={product.ID} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md border border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200">
                            <Icon
                              icon="mdi:image-off"
                              width="20"
                              className="text-gray-400"
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        <Link
                          href={`/admin/products/${product.ID}`}
                          className="hover:underline"
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {product.categories && product.categories.length > 0
                          ? product.categories[0].name
                          : "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {product.isSold ? "ขายแล้ว" : "ยังขายไม่ได้"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/products/${product.ID}`}
                            className="p-2 text-blue-600 hover:text-blue-800"
                          >
                            <Icon icon="mdi:pencil" width="20" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product)}
                            className="p-2 text-red-600 hover:text-red-800"
                          >
                            <Icon icon="mdi:delete" width="20" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="max-w-6xl mx-auto md:hidden">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">ไม่มีสินค้า</p>
          ) : (
            <div className="space-y-4">
              {products.map((product: any) => (
                <div
                  key={product.ID}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center gap-4"
                >
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
                        width="20"
                        className="text-gray-400"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">
                      ราคา: {product.price.toLocaleString()} บาท
                    </p>
                    <p className="text-gray-600">
                      หมวดหมู่:{" "}
                      {product.categories && product.categories.length > 0
                        ? product.categories[0].name
                        : "-"}
                    </p>
                    <p className="text-gray-600">คงเหลือ: {product.quantity}</p>
                    <p className="text-gray-600">
                      ขายแล้ว: {product.isSold ? "ขายแล้ว" : "ยังขายไม่ได้"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${product.ID}`}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <Icon icon="mdi:pencil" width="20" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Icon icon="mdi:delete" width="20" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-5">
          {loading && <p>กำลังโหลด...</p>}
          {hasMore && !loading && (
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              โหลดเพิ่ม
            </button>
          )}
          {!hasMore && <p>ไม่มีสินค้าเพิ่มแล้ว</p>}
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
