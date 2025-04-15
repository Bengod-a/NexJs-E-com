"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const NavBarAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      isSidebarOpen
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          type="button"
          className="fixed top-4 left-4 z-50  p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">เปิด/ปิดเมนู</span>
          <Icon icon="mdi:menu" width="24" height="24" />
        </button>
      )}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xs  bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      <aside
        ref={sidebarRef}
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0  transition-all left-0 z-40 w-64 h-screen duration-500 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full  px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl flex items-center gap-2 font-bold">
              <Icon
                icon="mdi:cart-outline"
                width="24"
                height="24"
                color="white"
              />
              <span className="text-white flex">
                BE. <span className="text-gray-500">N</span>
              </span>
            </h1>
          </div>
          <ul className="space-y-2 mt-10 font-medium">
            <li>
              <Link
                href="/admin"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icon
                  icon="mdi:view-dashboard"
                  width="20"
                  height="20"
                  className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="ms-3">แดชบอร์ด</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                aria-expanded={isDropdownOpen}
              >
                <Icon
                  icon="mdi:cart"
                  width="20"
                  height="20"
                  className="shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  อีคอมเมิร์ซ
                </span>
                <Icon
                  icon="mdi:chevron-down"
                  width="12"
                  height="12"
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <ul
                id="dropdown-example"
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } py-2 space-y-2`}
              >
                <li>
                  <Link
                    href="/admin/products/create"
                    className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <Icon
                      icon="gridicons:product-downloadable"
                      width="24"
                      height="24"
                    />
                    เพิ่มสินค้า
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/category1"
                    className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <Icon
                      icon="carbon:collapse-categories"
                      width="24"
                      height="24"
                    />
                    เพิ่มหมวดหมู่1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/category2"
                    className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <Icon
                      icon="carbon:collapse-categories"
                      width="24"
                      height="24"
                    />
                    เพิ่มหมวดหมู่2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/orders"
                    className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <Icon
                      icon="lsicon:order-done-filled"
                      width="24"
                      height="24"
                    />
                    คำสั่งซื้อ
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/admin/inbox"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icon
                  icon="mdi:email"
                  width="20"
                  height="20"
                  className="shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  กล่องจดหมาย
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icon
                  icon="mdi:account-group"
                  width="20"
                  height="20"
                  className="shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">ผู้ใช้</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icon
                  icon="mdi:package-variant"
                  width="20"
                  height="20"
                  className="shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">สินค้า</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icon
                  icon="mdi:login"
                  width="20"
                  height="20"
                  className="shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">หน้าแรก</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default NavBarAdmin;
