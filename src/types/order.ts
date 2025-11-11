interface OrderItem {
  productId: string;
  variantId?: string;
  quantity: number;
  name: string;
  image: string;
  price: number;
}
interface Address {
  _id: string;
  fullName: string;
  address: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  totalAmount: number;
  discountAmount?: number;
  paymentMethod: "COD";
  deliveryDate: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

export type { Order, OrderItem, Address };