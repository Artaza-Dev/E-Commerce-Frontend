import { Tag, ArrowRight } from "lucide-react";
import productStore from "../../store/productStore";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const OrderSummary: React.FC = () => {
  const {
    applyCouponCode,
    discount,
    cartThings
  } = productStore();
  const navigate = useNavigate();
  const [code, setCode] = useState<String>("");

  const { subtotal, deliveryFee, totalItems, discountedTotal } = useMemo(() => {
    const subtotal = cartThings.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );

    const deliveryFee = cartThings.length > 0 ? cartThings.length * 200 : 0;
    const totalItems = cartThings.reduce((acc, item) => acc + item.quantity, 0);

    const total = subtotal + deliveryFee;
    const discountAmount = (total * (discount || 0)) / 100;
    const discountedTotal = total - discountAmount;

    return { subtotal, deliveryFee, totalItems, discountedTotal };
  }, [cartThings, discount]);

  const orderHander = (totalItems: number) => {
    if (totalItems > 0) {
      navigate("/checkout");
    } else {
      toast.error("No items found");
    }
  };
  // Coupon code apply handler
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const result = await applyCouponCode(code as string);
    if (result?.success) {
      toast.success("Coupon applied successfully!");
    } else {
      toast.error(result?.message || "Invalid or expired coupon code!");
    }
  };

  return (
    <div className="w-full bg-gray-50 rounded-2xl shadow-lg p-5 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 border-b pb-3">
        Order Summary
      </h2>

      {/* Price Details */}
      <div className="space-y-4 text-gray-800">
        <div className="flex justify-between">
          <span>Total Items</span>
          <span className="font-semibold">{totalItems || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">
            Rs {subtotal.toLocaleString() || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-semibold">
            Rs {deliveryFee.toFixed(0) || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span className="font-semibold">Rs {discount || 0}%</span>
        </div>

        <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>Rs {discountedTotal.toLocaleString() || 0}</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="flex gap-2 mt-6">
        <div className="flex items-center grow bg-white border-zinc-700 rounded-lg p-3 shadow-sm">
          <Tag className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Add coupon code"
            className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <button
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer"
          onClick={submitHandler}
        >
          Apply
        </button>
      </div>

      {/* Checkout Button */}
      <button
        className="w-full bg-black text-white py-3 mt-5 rounded-lg font-semibold text-lg hover:bg-gray-800 transition flex justify-center items-center gap-2 cursor-pointer"
        onClick={() => orderHander(totalItems)}
      >
        ({cartThings?.length}) Go to Checkout
        <ArrowRight />
      </button>
    </div>
  );
};

export default OrderSummary;
