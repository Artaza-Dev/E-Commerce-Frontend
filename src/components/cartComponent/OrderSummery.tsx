import { Tag, ArrowRight } from "lucide-react";
import productStore from "../../store/productStore";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
const OrderSummary: React.FC = () => {
  const { summaryItems } = productStore();
  const navigate = useNavigate();

  // Calculate summary values dynamically
  const { subtotal, deliveryFee, totalItems, total } = useMemo(() => {
    const subtotal = summaryItems.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );

    const deliveryFee = subtotal > 0 ? summaryItems.length * 200 : 0;
    const totalItems = summaryItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const total = subtotal + deliveryFee;

    return { subtotal, deliveryFee, totalItems, total };
  }, [summaryItems]);

  const orderHander = (totalItems: number)=>{
    if(totalItems > 0){
      navigate('/checkout')
    }else{
      alert('No items found')
    }
  }

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
          <span className="font-semibold">Rs {subtotal.toFixed(0) || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-semibold">
            Rs {deliveryFee.toFixed(0) || 0}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="font-semibold">Rs -{0}</span>
        </div>

        <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>Rs {total.toFixed(0) || 0}</span>
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
          />
        </div>

        <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer">
          Apply
        </button>
      </div>

      {/* Checkout Button */}
      <button
        className="w-full bg-black text-white py-3 mt-5 rounded-lg font-semibold text-lg hover:bg-gray-800 transition flex justify-center items-center gap-2 cursor-pointer"
        onClick={()=>orderHander(totalItems)}
      >
       ({totalItems}) Go to Checkout
        <ArrowRight />
      </button>
    </div>
  );
};

export default OrderSummary;
