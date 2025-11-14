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
  productLoading: boolean;
  wishlistLoading: boolean;
  error: string | null;
  cartItems: any[];
  categoryItems: any[];
  summaryItems: any[];
  selectedCategory: string;
  discount: number | null;
  hasNextPage: boolean;
  nextPage: number;
  cartLength: number;
  cartThings: any[];
  addItemsToSummary: (data: any[]) => void;
  setSelectedCategory: (cat: string) => void;
  fetchProductByCategory: (
    id: string
  ) => Promise<{ success: boolean; message?: string; data?: any }>;
  fetchProducts: (
    page: number,
    limit: number,
    append: boolean
  ) => Promise<void>;
  findProduct: (id: string) => Promise<void>;
  addToCart: (data: Cart) => Promise<{ success: boolean; message?: string }>;
  fetchCartItems: (
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
  applyCouponCode: (
    code: string
  ) => Promise<{ success: boolean; message?: string }>;
  createReview: (
    data: any
  ) => Promise<{ success: boolean; message?: string }>;
}

const productStore = create<ProductStore>((set) => ({
  hasNextPage: true,
  nextPage: 2,
  product: [],
  currentProduct: null,
  wishListProducts: [],
  loading: false,
  productLoading: false,
  wishlistLoading: false,
  error: null,
  message: null,
  cartItems: [],
  cartLength: 0,
  categoryItems: [],
  summaryItems: [],
  cartThings:[],
  selectedCategory: localStorage.getItem("selectedCategory") || "AllProducts",
  discount: null,

  setCartThings: (items: any) => set({ cartThings: items }),

  addItemsToSummary: (data: any[]) => {
    set(() => {
      const summary = data;
      console.log("summary data in store", summary);

      return { summaryItems: summary };
    });
  },

  // Fetch all products from API
  fetchProducts: async (page: number, limit: number, append: boolean) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/product/fetchproducts", {
        params: { page, limit },
      });
      const { docs, hasNextPage, nextPage } = response.data.products;

      set((state) => ({
        product: append ? [...state.product, ...docs] : docs,
        loading: false,
        error: null,
        hasNextPage,
        nextPage: hasNextPage ? nextPage : 1,
      }));
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
      const newCartItems = response.data.cart?.items || [];
      set({ loading: false, error: null, message: response.data.message, cartItems: newCartItems, });
      return {
        success: true,
        data: response.data,
        message: response.data.message,
        // cartLength: newCartItems.length
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "add cart failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  fetchCartItems: async () => {
    try {
      set({ productLoading: true, error: null });
      const response = await api.get("/product/cartitems");
      console.log("items in store", response.data.items);
      const items = response.data.items || [];

      set({
        productLoading: false,
        error: null,
        cartItems: items,
        // cartLength: items.length,
        message: response.data.message,
      });
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "add cart failed";
      set({ productLoading: false, error: message });
      return { success: false, message };
    }
  },

  deleteCartItems: async (id: string) => {
  try {
    set({ loading: true, error: null });

    const response = await api.get(`/product/deletecartitems/${id}`);
    const updatedCartItems = response.data.cart?.items || [];

    set({
      loading: false,
      error: null,
      cartItems: updatedCartItems,
      // cartLength: updatedCartItems.length,
      message: response.data.message,
    });

    return {
      success: true,
      message: response.data.message,
      data: response.data.cart,
    };
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

  addProductToWishList: async (id: string) => {
    try {
      set({ wishlistLoading: true, error: null });
      const response = await api.get(`/product/addtowishlist/${id}`);
      const wishlistResponse = await api.get("/product/getwishlist");
      const wishlistItems = wishlistResponse.data.wishlistItems.map(
      (item: any) => item.product
    );
      set({
      wishlistLoading: false,
      error: null,
      wishListProducts: wishlistItems 
    });
      return {
        success: true,
        message: response.data.message,
        data: response.data,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "delete cart failed";
      set({ wishlistLoading: false, error: message });
      return { success: false, message };
    }
  },

  fetchWishListItems: async () => {
    try {
      set({ wishlistLoading: true, error: null });
      const response = await api.get("/product/getwishlist");
      const wishlistItems = response.data.wishlistItems.map(
      (item: any) => item.product
    );
      set({
        wishlistLoading: false,
        error: null,
        message: response.data.message,
        wishListProducts: wishlistItems,
      });
      return {
        success: true,
        message: response.data.message,
        data: response.data,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "delete cart failed";
      set({ wishlistLoading: false, error: message });
      return { success: false, message };
    }
  },
  applyCouponCode: async (code: string) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post("/coupon/applycoupon", { code });

      set({
        loading: false,
        error: null,
        message: response.data.message,
        discount: response.data.discount || null,
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
  createReview: async (data: any) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post("/product/review", data);

      set({
        loading: false,
        error: null,
        message: response.data.message,
      });
      return {
        success: true,
        message: response.data.message,
        data: response.data,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "Create review failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },
}));

export default productStore;
