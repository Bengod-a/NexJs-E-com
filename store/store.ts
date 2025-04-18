import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  lastname: string;
  image?: string;
  phonenumber: string;
  orders: [];
  address: [];
  favorite: [];
  carts: any[];
  productOnCart: any[];
}

const store = (set: any) => ({
  user: null as User | null,
  token: null,
  carts: [] as any[],
  favorite: [] as any[],
  productOnCart: [] as any[],
  actionLogin: async (email: string, password: string, setIsopen: any) => {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      setIsopen(false);
      console.log(data);
      set({
        user: data.user,
        token: data.token,
        carts: data.user.carts || [],
        favorite: data.user.favorite || [],
        productOnCart: data.user.productOnCart || [],
      });
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
    return res;
  },
});

const config = {
  name: "store",
  storage: createJSONStorage(() => localStorage),
};

const useStore = create(persist(store, config));

export default useStore;
