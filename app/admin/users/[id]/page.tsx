"use client"

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation'; 

export default function UserDetailsPage() {
    const router = useRouter();


    const handleGoBack = () => {
        router.back(); 
      };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button 
          onClick={handleGoBack}
          className="text-gray-600 hover:text-gray-800">
            <Icon icon="ic:baseline-arrow-back" width="24" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">รายละเอียดผู้ใช้</h1>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-6">
          <img 
            src="https://lh3.googleusercontent.com/a/ACg8ocKjrecXKxC0geFOA1bKq4e2B33pE1-_sGf0UEmKbVia7MiiTPpd=s96-c" 
            alt="รูปภาพผู้ใช้" 
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">masteraniwant@gmail.com</h2>
            <p className="text-gray-600">john@example.com</p>
          </div>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">บทบาท</label>
              <select className="mt-1 block w-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>ผู้ดูแลระบบ</option>
                <option>ผู้ใช้</option>
                <option>บรรณาธิการ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">สถานะ</label>
              <select className="mt-1 block w-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>ใช้งาน</option>
                <option>ไม่ใช้งาน</option>
              </select>
            </div>
            <button className="self-end bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              บันทึก
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">ประวัติคำสั่งซื้อ</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รหัสคำสั่งซื้อ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จำนวนสินค้า</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ยอดรวม</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* ตัวอย่างแถวคำสั่งซื้อ */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#12345</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 เมษายน 2568</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 ชิ้น</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">฿4,500.00</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  จัดส่งแล้ว
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#12346</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 เมษายน 2568</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 ชิ้น</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">฿2,699.00</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                  กำลังดำเนินการ
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}