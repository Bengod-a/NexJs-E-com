import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import useStore from "../../store/store";

interface ModalProps {
  isopen: boolean;
  setIsopen: (isopen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ isopen, setIsopen }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const actionLogin = useStore((state) => state.actionLogin);
  const user = useStore((s) => s.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await actionLogin(email, password, setIsopen);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {isopen && (
        <motion.div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">เข้าสู่ระบบ</h2>
              <button
                onClick={() => setIsopen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <Icon
                  icon="material-symbols-light:close"
                  width="28"
                  height="28"
                />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  อีเมล
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="อีเมล"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                  />
                  <Icon
                    icon="mdi:email"
                    width="20"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  รหัสผ่าน
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    placeholder="รหัสผ่าน"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                  />
                  <Icon
                    icon="mdi:lock"
                    width="20"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:login" width="20" />
                เข้าสู่ระบบ
              </button>

              <div className="flex gap-2 items-center justify-center mt-4">
                <span className="text-gray-600 text-sm">ไม่ใช่สมาชิก?</span>
                <Link
                  href="/register"
                  className="text-red-600 hover:text-red-700 text-sm font-medium border-b border-red-600 hover:border-red-700 transition-colors duration-200"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
