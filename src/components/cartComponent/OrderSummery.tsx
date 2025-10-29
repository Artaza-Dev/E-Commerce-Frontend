import { FaTag, FaArrowRight } from "react-icons/fa";

interface SummaryProps {
  subtotal: number;
  discountPercentage: number;
  deliveryFee: number;
}

const summaryData: SummaryProps = {
  subtotal: 565,
  discountPercentage: 20,
  deliveryFee: 15,
};

const OrderSummary: React.FC = () => {
  const { subtotal, discountPercentage, deliveryFee } = summaryData;

  // Calculate Discount Amount
  const discountAmount = subtotal * (discountPercentage / 100);

  // Calculate Total
  const total = subtotal - discountAmount + deliveryFee;

  return (
   <div className="w-full bg-gray-50 rounded-2xl shadow-lg p-5 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 border-b pb-3">
         Order Summary
      </h2>

      {/* Price Details */}
      <div className="space-y-4 text-gray-800">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(0)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount (-{discountPercentage}%)</span>
          <span className="font-semibold text-red-500">
            -${discountAmount.toFixed(0)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-semibold">${deliveryFee.toFixed(0)}</span>
        </div>

        <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(0)}</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="flex gap-2 mt-6">
        <div className="flex items-center flex-grow bg-white border-zinc-700 rounded-lg p-3 shadow-sm">
          <FaTag className="text-gray-500 mr-2" size={16} />
          <input
            type="text"
            placeholder="Add coupon code"
            className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
          />
        </div>

        <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer">
          Apply
        </button>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-black text-white py-3 mt-5 rounded-lg font-semibold text-lg hover:bg-gray-800 transition flex justify-center items-center gap-2 cursor-pointer">
        Go to Checkout
        <FaArrowRight />
      </button>
    </div>
  );
};

export default OrderSummary;
