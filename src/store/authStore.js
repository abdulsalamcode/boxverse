import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { id, name, email, role: "admin" | "user" }
      token: null,
      loading: false,

      setAuth: (user, token) => set({ user, token }),

      // Alias so existing components calling login(user, token) keep working
      login: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),

      isAdmin: () => get().user?.role === "admin",

      isAuthenticated: () => !!get().token && !!get().user,
    }),
    {
      name: "boxverse-auth", // localStorage key
    }
  )
);