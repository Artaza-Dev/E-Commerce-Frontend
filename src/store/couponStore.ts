import { create } from "zustand";
import api from "../services/api";
import type { Coupon } from "../types/coupon";

interface CouponStore {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
  message: string | null;
  fetchCoupon: () => Promise<void>;
}

const couponStore = create<CouponStore>((set) => ({
  coupons: [],
  loading: false,
  error: null,
  message: null,

  fetchCoupon: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/coupon/mycoupons");
      console.log("Coupon response:", response.data);

      // Extract nested coupon data
      const formattedCoupons = response.data.coupon.map((item: any) => item.coupon);

      set({
        coupons: formattedCoupons || [],
        loading: false,
      });
    } catch (err: any) {
      set({
        loading: false,
        error: err.message || "Failed to fetch coupons",
      });
    }
  },
}));

export default couponStore;
