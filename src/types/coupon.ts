interface Coupon {
  code: String;
  discountValue: number;
  expiryDate: Date;
  isActive: Boolean;
}

export type { Coupon };