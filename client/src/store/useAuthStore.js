import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isAdmin: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({
        authUser: res.data,
        isAdmin: res.data.role === "admin",
      });
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Auth error:", error);
      }
      set({ authUser: null, isAdmin: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      await axiosInstance.post("/auth/signup", data);

      toast.success("Anjaaay, akunnya berhasil dibuat nihh 😎");
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan, coba lagi"
      );
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  loginAdmin: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);

      if (res.data.role !== "admin") {
        toast.error("Akun ini bukan admin");
        return false;
      }

      set({
        authUser: res.data,
        isAdmin: true,
      });

      toast.success("Selamat datang Admin 👑");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login admin gagal");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({
        authUser: res.data,
        isAdmin: res.data.role === "admin",
      });

      toast.success("Oke, enjoy2 yaaa ✔️");
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan, coba lagi"
      );
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, isAdmin: false });
      toast.success("Jangan lupa mampir lagi kapan2 🥹");
    } catch (error) {
      toast.error("Waduh, ga bisa logout bre ⚠️");
      console.error("Kesalahan ga bisa keluar:", error);
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Cieee komuknya ganti 🗿");
    } catch (error) {
      console.error("Kesalahan ga bisa perbarui komuk:", error);
      toast.error(error.response.data.message);
    }
  },
}));
