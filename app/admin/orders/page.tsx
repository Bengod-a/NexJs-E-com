import { Icon } from "@iconify/react";
import NavBarAdmin from "../../../components/admin/NavbarAdmin";

export default function OrdersPage() {
  return (
    <>
      <NavBarAdmin />

      <div className="min-h-screen bg-gray-100 p-6">
        <header className="flex justify-between items-center mb-6 mt-10">
          <h1 className="text-2xl font-bold text-gray-800">
            การจัดการคำสั่งซื้อ
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <Icon icon="ic:baseline-add" width="20" />
            สร้างคำสั่งซื้อ
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
              placeholder="ค้นหาคำสั่งซื้อ..."
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
                  รหัสคำสั่งซื้อ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ลูกค้า
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  วันที่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  จำนวนสินค้า
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ยอดรวม
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #12345
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  จอห์น โด
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1 เมษายน 2568
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  3 ชิ้น
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ฿4,500.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                    จัดส่งแล้ว
                  </span>
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
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #12346
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  เจน สมิธ
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  5 เมษายน 2568
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2 ชิ้น
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ฿2,699.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                    กำลังดำเนินการ
                  </span>
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
          <p className="text-sm text-gray-600">
            แสดง 1 ถึง 10 จาก 50 คำสั่งซื้อ
          </p>
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
