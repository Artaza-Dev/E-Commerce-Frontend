interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  variantMaxQuantity: number;
}

interface Cart {
  _id?: string;
  userId?: string;
  items?: CartItem[];
}

export type { Cart, CartItem };