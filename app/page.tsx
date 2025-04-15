"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Nav/Navbar";
import { isTokenExpired } from "../middleware";
import Hero from "../components/Hero/Hero";
import NewProduct from "../components/Hero/NewProduct";
import HotSale from "../components/Hero/HotSale";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken || isTokenExpired(storedToken)) {
      localStorage.removeItem("token");
      localStorage.removeItem("store");
      return;
    }

    setToken(storedToken);
  }, []);

  return (
    <div className="bg-[#f6f9fc]">
      <Navbar />
      <Hero />
      <HotSale />
      <NewProduct />
    </div>
  );
}
