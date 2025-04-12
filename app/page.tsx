"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Nav/Navbar";
import { isTokenExpired } from "../middleware";

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

  return <Navbar />;
}
