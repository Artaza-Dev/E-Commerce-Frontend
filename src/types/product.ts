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

interface Review {
  user: string;
  comment: string;
  rating: number;
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
export type { Product, Variant, Specs, Review };