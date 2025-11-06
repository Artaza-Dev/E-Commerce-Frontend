interface Variant {
  _id: string;
  color: string;
  storage: string;
  price: number;
  quantity: number;
}

interface Specs {
  processor: string;
  battery: string;
  display: string;
}


interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  baseprice: number;
  description: string;
  images: string[];
  specs: Specs;
  variants: Variant[];
  rating?: number;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

interface Review {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  approved: boolean;
}

export type { Product, Variant, Specs, Review };