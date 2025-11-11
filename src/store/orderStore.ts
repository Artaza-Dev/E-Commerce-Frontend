import { create } from "zustand";
import api from "../services/api";
import type { Order } from "../types/order";

interface OrderStore {
  Orders: Order[];
  loading: boolean;
  error: string | null;
  message: string | null;
  fetchOrder: () => Promise<{ success: boolean; data?: any; message?: string }>;
  createOrder: (
    data: Order
  ) => Promise<{ success: boolean; data?: any; message?: string }>;
}

const orderStore = create<OrderStore>((set) => ({
  Orders: [],
  loading: false,
  error: null,
  message: null,

  // Create address
  createOrder: async (data: Order) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post("/order/createorder", data);
      const { message } = response.data;
      set({
        loading: false,
        error: null,
        message: message || "Address created successfully!",
      });
      return { success: true, data: response.data };
    } catch (err: any) {
      const message = err.response?.data?.message || "Creating address failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  fetchOrder: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/order/getorder");
      console.log("items in store", response.data.orders);

      set({
        loading: false,
        error: null,
        Orders: response.data.orders,
        message: response.data.message,
      });
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "add Order failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },
}));

export default orderStore;
