import { create } from "zustand";
import api from "../services/api";
import type { User } from "../types/user";

interface UserStore {
  loading: boolean;
  error: string | null;
  message: string | null;
  user: User | null;
  token: string | null;
  registerUser: (data: User) => Promise<{ success: boolean; data?: any; message?: string }>;
  loginUser: (data: User) => Promise<{ success: boolean; data?: any; message?: string }>;
}

const userStore = create<UserStore>((set) => ({
  loading: false,
  error: null,
  message: null,
  user: null,
  token: null,

  // ✅ Fetch all products from API
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
      const response = await api.post('/user/login', data);
      set({
        loading: false,
        error: null,
        user: response.data.user || null,
        token: response.data.token || null,
        message: response.data.message || "Login successful!",
      });
      if (response.data.token) {
        await localStorage.setItem('token', response.data.token);
      }
      return { success: true, data: response.data, message: response.data.message };
    } catch (err: any) {
      const message = err.response?.data?.message || "Login failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },
}));

export default userStore;
