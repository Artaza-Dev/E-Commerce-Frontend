interface User {
  _id?: string;
  username?: string;
  email: string;
  password?: string;
  role?: "admin" | "customer";
  addresses?: string[];
  coupons?: string[];
  wishlist?: string[];
  cart?: string;
  createdAt?: string;
  updatedAt?: string;
}
export type { User };