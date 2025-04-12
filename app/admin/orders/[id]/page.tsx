"use client"

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

export default function OrderDetailsPage() {
    const router = useRouter();


    const handleGoBack = () => {
        router.back(); 
      };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* หัวข้อ */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
          onClick={handleGoBack}
          className="text-gray-600 hover:text-gray-800">
            <Icon icon="ic:baseline-arrow-back" width="24" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">รายละเอียดคำสั่งซื้อ</h1>
        </div>
      </header>

      {/* ข้อมูลคำสั่งซื้อ */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">คำสั่งซื้อ #12345</h2>
            <p className="text-gray-600">ลูกค้า: จอห์น โด</p>
            <p className="text-gray-600">วันที่: 1 เมษายน 2568</p>
            <p className="text-gray-600">จำนวนสินค้า: 3 ชิ้น</p>
            <p className="text-gray-600">ยอดรวม: ฿4,500.00</p>
          </div>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">สถานะ</label>
              <select className="mt-1 block w-40 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>จัดส่งแล้ว</option>
                <option>กำลังดำเนินการ</option>
                <option>รอการชำระเงิน</option>
                <option>ยกเลิก</option>
              </select>
            </div>
            <button className="self-end bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              บันทึก
            </button>
          </div>
        </div>
      </div>

      {/* รายการสินค้า */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">รายการสินค้า</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อสินค้า</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จำนวน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ราคาต่อหน่วย</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ยอดรวม</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* รายการตัวอย่าง */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">เสื้อยืดสีดำ</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">฿1,000.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">฿2,000.00</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">กางเกงยีนส์</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">฿2,500.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">฿2,500.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}