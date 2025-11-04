import {create} from 'zustand'
// import image1 from '../assets/mobile5.jpg'
// import image2 from '../assets/mobile3.jpg'
// import image3 from '../assets/mobile6.jpg'
import api from '../services/api'
export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  color: string;
  rom: string;
  display: string;
  camera: string;
  battery: string;
  processor: string;
  description: string;
  image: string;
}

interface ProductStore {
  product: Product[];
  currentProduct: Product | null;
  wishListProducts: Product[] ;
  findProduct: (id: string) => void;
  error: string | null;
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

const productStore = create<ProductStore>((set)=>({
  //   product: [
  //   {
  //     id: 1,
  //     name: "iPhone 17 Pro Max",
  //     brand: "Apple",
  //     category: "Laptop",
  //     price: 1499,
  //     color: "Titanium Gray",
  //     rom: "1TB",
  //     display: "6.9-inch Super Retina XDR",
  //     camera: "48MP + 12MP + 12MP Triple Camera",
  //     battery: "4,800 mAh",
  //     processor: "A19 Bionic Chip",
  //     description:
  //       "The iPhone 17 Pro Max combines cutting-edge design with lightning-fast performance, featuring a 6.9-inch display and A19 chip.",
  //     image: image1,
  //   },
  //   {
  //     id: 2,
  //     name: "iPhone 17 Pro Max",
  //     brand: "Apple",
  //     category: "Tablet",
  //     price: 1399,
  //     color: "Natural Titanium",
  //     rom: "512GB",
  //     display: "6.9-inch Super Retina XDR",
  //     camera: "48MP + 12MP + 12MP Triple Camera",
  //     battery: "4,800 mAh",
  //     processor: "A19 Bionic Chip",
  //     description:
  //       "Experience elegance and power with the Natural Titanium iPhone 17 Pro Max featuring unmatched performance.",
  //     image: image3,
  //   },
  //   {
  //     id: 3,
  //     name: "iPhone 17 Pro Max",
  //     brand: "Apple",
  //     category: "SmartPhone",
  //     price: 1299,
  //     color: "Blue Titanium",
  //     rom: "256GB",
  //     display: "6.9-inch Super Retina XDR",
  //     camera: "48MP + 12MP + 12MP Triple Camera",
  //     battery: "4,800 mAh",
  //     processor: "A19 Bionic Chip",
  //     description:
  //       "The Blue Titanium iPhone 17 Pro Max delivers beauty and performance with an ultra-efficient A19 chip.",
  //     image: image2,
  //   },
  //   {
  //     id: 3,
  //     name: "iPhone 17 Pro Max",
  //     brand: "Apple",
  //     category: "Watch",
  //     price: 1299,
  //     color: "Blue Titanium",
  //     rom: "256GB",
  //     display: "6.9-inch Super Retina XDR",
  //     camera: "48MP + 12MP + 12MP Triple Camera",
  //     battery: "4,800 mAh",
  //     processor: "A19 Bionic Chip",
  //     description:
  //       "The Blue Titanium iPhone 17 Pro Max delivers beauty and performance with an ultra-efficient A19 chip.",
  //     image: image1,
  //   },
  // ],
  product: [],
  currentProduct: null,
  wishListProducts: [],
  error: null,
  loading: false,

  fetchProducts: async () => {
    try {
      set({loading: true, error: null});
      let response = await api.get('/product/fetchproducts');
      set({product: response.data.products || [], error: null, loading: false});
    } catch (error: any) {
      set({error: error.message, loading: false});
    }
  },

  findProduct: async (id: string) =>{
    try {
      let response = await api.get(`/product/getproduct/${id}`);
      // console.log("Product in store",response.data.product);
      set({currentProduct: response.data.products || null, error: null, loading: false})
    } catch (error: any) {
      set({error: error.message, loading: false});
    }
  },
    
  
  addProductToWishList: (id: number) => {
  set((state) => {
    // Find product from main product list
    const foundProduct = state.product.find((p) => p.id === id);

    if (!foundProduct) {
      console.log("Product not found!");
      return state;
    }

    // Check if product already in wishlist
    const isAlreadyInWishlist = state.wishListProducts.some((p) => p.id === id);

    if (isAlreadyInWishlist) {
      // Remove from wishlist
      const updatedWishlist = state.wishListProducts.filter((p) => p.id !== id);
      console.log("Removed from wishlist:", foundProduct);
      return { wishListProducts: updatedWishlist };
    } else {
      // Add to wishlist
      const updatedWishlist = [...state.wishListProducts, foundProduct];
      console.log("Added to wishlist:", foundProduct);
      return { wishListProducts: updatedWishlist };
    }
  });
},

    

}))

export default productStore