import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Favorite } from "@prisma/client";


interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  image?: string;
  enabled: boolean;
  favorite: Favorite[];
} 

interface Store {
  user: User | null; 
  token: string | null;
  actionLogin: (email: string, password: string, setIsopen: any) => Promise<any>;
}


const store = (set: any) => ({
  user: null as User | null,
  token: null,
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
      set({
        user: data.user,
        token: data.user.token
      })
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
