"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Nav/Navbar";
import { isTokenExpired } from "../middleware";
import Hero from "../components/Nav/Hero/Hero";
import NewProduct from "../components/Nav/Hero/NewProduct";

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
    <>
      <Navbar />
      <Hero />
      <NewProduct />
    </>
  );
}
