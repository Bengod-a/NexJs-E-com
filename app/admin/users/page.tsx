"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import NavBarAdmin from "../../../components/admin/NavbarAdmin";

interface Users {
  id: number;
  name: string;
  email: string;
  role: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export default function AdminPage() {
  const [users, setUsers] = useState<Users[]>([]);

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    <NavBarAdmin />
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6 mt-10">
        <h1 className="text-2xl font-bold text-gray-800">การจัดการผู้ใช้</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <Icon icon="ic:baseline-person-add" width="20" />
          เพิ่มผู้ใช้
        </button>
      </header>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Icon
            icon="ic:baseline-search"
            width="20"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="ค้นหาผู้ใช้..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
          <Icon icon="ic:baseline-filter-list" width="20" />
          กรอง
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                รูปภาพ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ชื่อ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                อีเมล
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                บทบาท
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                การดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* ตัวอย่างแถวผู้ใช้ */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src="https://lh3.googleusercontent.com/a/ACg8ocKjrecXKxC0geFOA1bKq4e2B33pE1-_sGf0UEmKbVia7MiiTPpd=s96-c"
                  alt="รูปภาพผู้ใช้"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                จอห์น โด
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                john@example.com
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                admin
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Icon icon="ic:baseline-edit" width="20" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Icon icon="ic:baseline-delete" width="20" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">แสดง 1 ถึง 10 จาก 50 ผู้ใช้</p>
        <div className="flex gap-2">
          <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">
            <Icon icon="ic:baseline-arrow-back" width="20" />
          </button>
          <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">
            <Icon icon="ic:baseline-arrow-forward" width="20" />
          </button>
        </div>
      </div>
    </div>
    </>

  );
}
