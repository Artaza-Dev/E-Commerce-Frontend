import { create } from "zustand";
import api from "../services/api";
import type { User } from "../types/user";

interface UserStore {
  loading: boolean;
  error: string | null;
  message: string | null;
  user: User | null;
  token: string | null;
  registerUser: (
    data: User
  ) => Promise<{ success: boolean; data?: any; message?: string }>;
  loginUser: (
    data: User
  ) => Promise<{ success: boolean; data?: any; message?: string }>;
  logoutUser: () => Promise<{ success: boolean;message?: string }>;
  fetchCurrentUser: () => Promise<void>;
}

const userStore = create<UserStore>((set) => ({
  loading: false,
  error: null,
  message: null,
  user: null,
  token: null,

  registerUser: async (data: User) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post("/user/register", data);
      const { message, user } = response.data;
      set({
        loading: false,
        error: null,
        message: message || "Registered successfully!",
        user: user || null,
      });
      return { success: true, data: response.data };
    } catch (err: any) {
      const message = err.response?.data?.message || "Registration failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  loginUser: async (data: User) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post("/user/login", data);
      set({
        loading: false,
        error: null,
        user: response.data.user || null,
        token: response.data.token || null,
        message: response.data.message || "Login successful!",
      });
      if (response.data.token) {
        const expiryTime: any = Date.now() + 7 * 24 * 60 * 60 * 1000;
        await localStorage.setItem("token", response.data.token);
        await localStorage.setItem("tokenExpiry", expiryTime);

        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          set({ user: null, token: null });
          window.location.href = "/login";
        }, expiryTime - Date.now());
      }
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    } catch (err: any) {
      const message = err.response?.data?.message || "Login failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  logoutUser: async () => {
  try {
   
    await api.post("/user/logout"); 
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    set({ user: null, token: null });
    window.location.href = "/";

    return { success: true };
  } catch (error: any) {
    console.error("Logout failed:", error);
    set({ loading: false });
    return { success: false, message: error?.message || "Logout failed" };
  }
},

fetchCurrentUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await api.get("/user/mydata");
      set({ user: response.data.user, token });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set({ user: null, token: null });
    }
  },

}));

export default userStore;
