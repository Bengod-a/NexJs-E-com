// "use client";

// import React, { useState } from "react";
// import Header from "../../components/Nav/Navbar";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// const RegisterPage = () => {
//   const [formregister, setFormregister] = useState({
//     username: "" as string,
//     lastname: "" as string,
//     email: "" as string,
//     phonenumber: "" as string,
//     password: "" as string,
//     conpassword: "" as string,
//   });

//   const router = useRouter();

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:8080/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formregister),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.message);
//       } else {
//         toast.success("สมัครสมาชิกสำเร็จ");
//         router.push("/");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Header />

//       <div className="mt-10 w-full px-4 sm:px-6 lg:px-8">
//         <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-1 gap-6">
//           <div className="bg-white w-full max-w-[750px] mx-auto shadow-md rounded-lg">
//             <div className="flex items-center justify-center py-6">
//               <h1 className="text-red-500 font-extrabold text-2xl sm:text-3xl">
//                 ลงทะเบียน
//               </h1>
//             </div>

//             <form
//               className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6"
//               action=""
//             >
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="firstName"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   ชื่อ
//                 </label>
//                 <input
//                   className="mt-1 border border-gray-300 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
//                   type="text"
//                   name="firstName"
//                   id="firstName"
//                   placeholder="ชื่อ"
//                   onChange={(e) =>
//                     setFormregister({
//                       ...formregister,
//                       username: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="lastName"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   นามสกุล
//                 </label>
//                 <input
//                   className="mt-1 border border-gray-300 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
//                   type="text"
//                   name="lastName"
//                   id="lastName"
//                   placeholder="นามสกุล"
//                   onChange={(e) =>
//                     setFormregister({
//                       ...formregister,
//                       lastname: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="phone"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   เบอร์โทรศัพท์
//                 </label>
//                 <input
//                   className="mt-1 border border-gray-300 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
//                   type="tel"
//                   name="phone"
//                   id="phone"
//                   placeholder="เบอร์โทรศัพท์"
//                   onChange={(e) =>
//                     setFormregister({
//                       ...formregister,
//                       phonenumber: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </form>

//             {/* form2 */}
//             <form
//               className="flex flex-col gap-4 p-4 sm:p-6"
//               onSubmit={handleSubmit}
//             >
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="email"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   อีเมล
//                 </label>
//                 <input
//                   className="mt-1 border border-gray-300 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="อีเมล"
//                   onChange={(e) =>
//                     setFormregister({ ...formregister, email: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="password"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   รหัสผ่าน
//                 </label>
//                 <input
//                   className="mt-1 border border-gray-300 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
//                   type="text"
//                   name="password"
//                   id="password"
//                   placeholder="รหัสผ่าน"
//                   onChange={(e) =>
//                     setFormregister({
//                       ...formregister,
//                       password: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="conpassword"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   ยืนยันรหัสผ่าน
//                 </label>
//                 <input
//                   className="mt-1 border border-gray-300 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
//                   type="text"
//                   name="conpassword"
//                   id="conpassword"
//                   placeholder="ยืนยันรหัสผ่าน"
//                   onChange={(e) =>
//                     setFormregister({
//                       ...formregister,
//                       conpassword: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="md:col-span-2 flex justify-center mt-4">
//                 <button
//                   type="submit"
//                   className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition w-full sm:w-auto"
//                 >
//                   สมัครสมาชิก
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RegisterPage;

"use client";

import React, { useState } from "react";
import Header from "../../components/Nav/Navbar";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [formregister, setFormregister] = useState({
    username: "" as string,
    lastname: "" as string,
    email: "" as string,
    phonenumber: "" as string,
    password: "" as string,
    conpassword: "" as string,
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formregister),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success("สมัครสมาชิกสำเร็จ");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* หัวข้อ */}
        <header className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">ลงทะเบียน</h1>
          <p className="mt-2 text-gray-600">กรอกข้อมูลเพื่อสมัครสมาชิกในระบบ</p>
        </header>

        {/* ฟอร์มสมัครสมาชิก */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ชื่อ */}
                <div className="relative">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ชื่อ
                  </label>
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="ชื่อ"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                      onChange={(e) =>
                        setFormregister({
                          ...formregister,
                          username: e.target.value,
                        })
                      }
                    />
                    <Icon
                      icon="mdi:account"
                      width="20"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* นามสกุล */}
                <div className="relative">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    นามสกุล
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="นามสกุล"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                      onChange={(e) =>
                        setFormregister({
                          ...formregister,
                          lastname: e.target.value,
                        })
                      }
                    />
                    <Icon
                      icon="mdi:account-outline"
                      width="20"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* เบอร์โทรศัพท์ */}
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    เบอร์โทรศัพท์
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="เบอร์โทรศัพท์"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                      onChange={(e) =>
                        setFormregister({
                          ...formregister,
                          phonenumber: e.target.value,
                        })
                      }
                    />
                    <Icon
                      icon="mdi:phone"
                      width="20"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* อีเมล */}
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
                      name="email"
                      type="email"
                      placeholder="อีเมล"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                      onChange={(e) =>
                        setFormregister({
                          ...formregister,
                          email: e.target.value,
                        })
                      }
                    />
                    <Icon
                      icon="mdi:email"
                      width="20"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* รหัสผ่าน */}
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
                      name="password"
                      type="password"
                      placeholder="รหัสผ่าน"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                      onChange={(e) =>
                        setFormregister({
                          ...formregister,
                          password: e.target.value,
                        })
                      }
                    />
                    <Icon
                      icon="mdi:lock"
                      width="20"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* ยืนยันรหัสผ่าน */}
                <div className="relative">
                  <label
                    htmlFor="conpassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ยืนยันรหัสผ่าน
                  </label>
                  <div className="relative">
                    <input
                      id="conpassword"
                      name="conpassword"
                      type="password"
                      placeholder="ยืนยันรหัสผ่าน"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 bg-gray-50 transition duration-200"
                      onChange={(e) =>
                        setFormregister({
                          ...formregister,
                          conpassword: e.target.value,
                        })
                      }
                    />
                    <Icon
                      icon="mdi:lock-check"
                      width="20"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* ปุ่มสมัครสมาชิก */}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Icon icon="mdi:account-plus" width="20" />
                  สมัครสมาชิก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
