import { create } from "zustand";
import api from "../services/api";
import type { Product } from "../types/product";
import type { Cart } from "../types/cart";

interface ProductStore {
  product: Product[];
  currentProduct: Product | null;
  wishListProducts: Product[];
  message: string | null;
  loading: boolean;
  error: string | null;
  cartItems: any[];
  categoryItems: any[];
  summaryItems: any[];
  selectedCategory: string;
  addItemsToSummary: (data: any[]) => void;
  setSelectedCategory: (cat: string) => void;
  fetchProductByCategory: (
    id: string
  ) => Promise<{ success: boolean; message?: string; data?: any }>;
  fetchProducts: () => Promise<void>;
  findProduct: (id: string) => Promise<void>;
  addToCart: (data: Cart) => Promise<{ success: boolean; message?: string }>;
  fetchCartItems: (
    data: Cart
  ) => Promise<{ success: boolean; message?: string }>;
  deleteCartItems: (
    id: string
  ) => Promise<{ success: boolean; message?: string }>;
  addProductToWishList: (
    id: string
  ) => Promise<{ success: boolean; message?: string }>;
  fetchWishListItems: () => Promise<{
    success: boolean;
    message?: string;
    data?: any;
  }>;
}

const productStore = create<ProductStore>((set) => ({
  product: [],
  currentProduct: null,
  wishListProducts: [],
  loading: false,
  error: null,
  message: null,
  cartItems: [],
  categoryItems: [],
  summaryItems: [],
  selectedCategory: localStorage.getItem("selectedCategory") || "AllProducts",

  addItemsToSummary: (data: any[]) => {
    set(() => {
      const summary = data;
      console.log('summary data in store', summary);
      
      return { summaryItems: summary };
    });
  },

  // Fetch all products from API
  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/product/fetchproducts");
      set({
        product: response.data.products || [],
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Failed to fetch products" });
    }
  },

  // Fetch single product by ID
  findProduct: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get(`/product/getproduct/${id}`);
      set({
        currentProduct: response.data.product || null,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Failed to fetch product" });
    }
  },

  addToCart: async (data: Cart) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post("/product/addtocart", data);
      console.log("add to cart response in stroe", response.data);

      set({ loading: false, error: null, message: response.data.message });
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "add cart failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/product/cartitems");
      console.log("items in store", response.data.items);

      set({
        loading: false,
        error: null,
        cartItems: response.data.items,
        message: response.data.message,
      });
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "add cart failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  deleteCartItems: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get(`/product/deletecartitems/${id}`);

      set({ loading: false, error: null, message: response.data.message });
      return { success: true, message: response.data.message };
    } catch (error: any) {
      const message = error.response?.data?.message || "delete cart failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  setSelectedCategory: (cat: string) => {
    localStorage.setItem("selectedCategory", cat);
    set({ selectedCategory: cat });
  },

  fetchProductByCategory: async (category: string) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get(
        `/product/getproductsbycategory/${category}`
      );
      localStorage.setItem("selectedCategory", category);
      console.log("categoryItems in store", response.data.products);
      set({
        loading: false,
        error: null,
        message: response.data.message,
        categoryItems: response.data.products || [],
        selectedCategory: category,
      });
      return {
        success: true,
        message: response.data.message,
        data: response.data,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "delete cart failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  //  Add/Remove product from wishlist
  addProductToWishList: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get(`/product/addtowishlist/${id}`);
      set({
        loading: false,
        error: null,
        message: response.data.message,
        wishListProducts: response.data.products || [],
      });
      return {
        success: true,
        message: response.data.message,
        data: response.data,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "delete cart failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  fetchWishListItems: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/product/getwishlist");
      set({
        loading: false,
        error: null,
        message: response.data.message,
        wishListProducts: response.data.wishlistItems || [],
      });
      return {
        success: true,
        message: response.data.message,
        data: response.data,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "delete cart failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },
}));

export default productStore;
