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
  fetchProducts: () => Promise<void>;
  findProduct: (id: string) => Promise<void>;
  addProductToWishList: (id: string) => void;
  addToCart: (data: Cart) => Promise<{ success: boolean; message?: string }>
  fetchCartItems: (data: Cart) => Promise<{ success: boolean; message?: string }>
}

const productStore = create<ProductStore>((set) => ({
  product: [],
  currentProduct: null,
  wishListProducts: [],
  loading: false,
  error: null,
  message: null,
  cartItems: [],

  // ✅ Fetch all products from API
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

  // ✅ Fetch single product by ID
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

  addToCart: async (data: Cart)=>{
    try {
      set({ loading: true, error: null });
      const response = await api.post("/product/addtocart", data);
      set({loading: false, error: null, message: response.data.message})
      return { success: true, data: response.data, message: response.data.message }

    } catch (error: any) {
      const message = error.response?.data?.message || "add cart failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },
  fetchCartItems: async ()=>{
     try {
      set({ loading: true, error: null });
      const response = await api.get("/product/cartitems");
      set({loading: false, error: null, cartItems: response.data.items, message: response.data.message,})
      return { success: true, data: response.data, message: response.data.message, }

    } catch (error: any) {
      const message = error.response?.data?.message || "add cart failed";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  // ✅ Add/Remove product from wishlist
  addProductToWishList: (id: string) => {
    set((state) => {
      const found = state.product.find((p) => p._id === id);
      if (!found) {
        console.warn("Product not found");
        return state;
      }

      const alreadyInWishlist = state.wishListProducts.some(
        (p) => p._id === id
      );

      let updatedWishlist;
      if (alreadyInWishlist) {
        // remove from wishlist
        updatedWishlist = state.wishListProducts.filter((p) => p._id !== id);
        console.log("Removed from wishlist:", found.name);
      } else {
        // add to wishlist
        updatedWishlist = [...state.wishListProducts, found];
        console.log("Added to wishlist:", found.name);
      }

      return { wishListProducts: updatedWishlist };
    });
  },
}));

export default productStore;
