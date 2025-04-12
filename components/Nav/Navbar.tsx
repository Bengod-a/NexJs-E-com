import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Modal from "./Modal";
import Image from "next/image";
import useStore from "../../store/store";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isopen, setIsopen] = useState(false);
  const user = useStore((s) => s.user);


  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("store");
    window.location.reload();
  };

  return (
    <header className="border-b border-gray-200">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            <span className="text-black">BE.</span>
            <span className="text-gray-500">N</span>
          </h1>
        </Link>

        <form onSubmit={handleSearch} className="w-[500px] mt-2 sm:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาสินค้า"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[500px] py-2 px-4 pl-10 border-none shadow bg-gray-100 text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <Icon
              icon="material-symbols-light:search-rounded"
              width="24"
              height="24"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            />
          </div>
        </form>

        <div className="flex items-center gap-4">
          {!user && (
            <>
              <button
                onClick={() => setIsopen(true)}
                className="bg-gray-400 text-white  p-2 rounded-full hover:bg-gray-700"
              >
                <Icon icon="mdi:user-outline" width="24" height="24" />
              </button>
              {isopen && <Modal isopen={isopen} setIsopen={setIsopen} />}
            </>
          )}

          {user && (
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {user?.image ? (
                    <Image
                      alt="Profile"
                      src={user?.image}
                      className="rounded-full"
                      width={35}
                      height={35}
                    />
                  ) : (
                    <div className="w-[35px] h-[35px] rounded-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-600 font-medium text-center">
                        {user?.name
                          ? user?.name.replace(/\s/g, "").slice(0, 2)
                          : ""}
                      </p>
                    </div>
                  )}
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    บัญชีของฉัน
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    รายการสินค้าโปรด
                  </a>
                </MenuItem>
                <MenuItem>
                  <button 
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                    ออกจากระบบ
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          )}

          <button className=" cursor-pointer">
            <div className="relative">
              <Icon
                icon="solar:bag-3-outline"
                width="24"
                height="24"
                className="text-gray-500"
              />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                1
              </span>
            </div>
          </button>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto p-2">
        <ul className="flex space-x-6 text-sm">
          <li>
            <Link href="/products" className="hover:text-red-600">
              สินค้า
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-red-600">
              เกี่ยวกับเรา
            </Link>
          </li>
          <li>
            <Link href="/promotions" className="hover:text-red-600">
              โปรโมชั่น
            </Link>
          </li>
          <li>
            <Link href="/how-to-order" className="hover:text-red-600">
              วิธีสั่งซื้อ
            </Link>
          </li>
          <li>
            <Link href="/payment" className="hover:text-red-600">
              ช่องทางการชำระเงิน
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-red-600">
              ติดต่อเรา
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
