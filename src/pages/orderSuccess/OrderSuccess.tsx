import { CheckCircle, Home, Package } from "lucide-react";
import { NavLink } from "react-router-dom";
function OrderSuccess() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Animated Checkmark */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
              <div className="relative bg-linear-to-br from-emerald-500 to-teal-600 rounded-full p-6 shadow-lg">
                <CheckCircle
                  className="w-16 h-16 md:w-20 md:h-20 text-white"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Order Placed Successfully!
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto">
            Thank you for your purchase. Your order has been confirmed and will
            be processed shortly.
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
          </div>

          {/* Information Text */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
            <div className="flex items-start justify-center gap-3 text-emerald-800">
              <Package className="w-5 h-5 mt-1 shrink-0" />
              <p className="text-sm md:text-base text-left">
                You will receive a confirmation email shortly with your order
                details and tracking information.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NavLink to="/">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                <Home className="w-5 h-5" />
                <span>Continue Shopping</span>
              </button>
            </NavLink>

            <NavLink to="/orders">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 cursor-pointer">
                <Package className="w-5 h-5" />
                <span>View Orders</span>
              </button>
            </NavLink>
          </div>
        </div>

        {/* Bottom Decorative Text */}
        <p className="text-center text-gray-500 text-sm mt-8 font-light">
          We appreciate your business and look forward to serving you again.
        </p>
      </div>
    </div>
  );
}

export default OrderSuccess;
