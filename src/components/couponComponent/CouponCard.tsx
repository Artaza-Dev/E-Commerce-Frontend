import { useEffect } from "react";
import couponStore from "../../store/couponStore";
import Loader from "react-js-loader";

const CouponCard: React.FC = () => {
  const { coupons, fetchCoupon, loading, error } = couponStore();

  useEffect(() => {
    fetchCoupon();
  }, [fetchCoupon]);

  // ✅ Show loader first
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] w-full">
        <Loader
          type="spinner-default"
          bgColor="#000000"
          color="#000000"
          size={80}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center font-medium min-h-[200px] flex items-center justify-center">
        {error}
      </div>
    );
  }


  if (coupons.length === 0) {
    return (
      <div className="text-gray-600 text-center font-medium min-h-[200px] flex items-center justify-center">
        No coupons found
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {coupons.map((coupon, index) => {
        const formattedDate = new Date(coupon.expiryDate).toLocaleDateString();

        return (
          <div
            key={index}
            className={`w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between transition-transform duration-200 hover:scale-105 ${
              !coupon?.isActive ? "opacity-50" : ""
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Coupon</h3>
              {coupon?.isActive && (
                <span className="px-3 py-1 text-xs font-semibold bg-gray-200 rounded-full text-gray-700">
                  Active
                </span>
              )}
            </div>

            <div className="mb-4">
              <p className="text-gray-800 font-semibold text-xl">
                {coupon?.code}
              </p>
              <p className="text-gray-600 mt-1">
                Discount:{" "}
                <span className="font-medium">{coupon?.discountValue}%</span>
              </p>
              <p className="text-gray-500 mt-1 text-sm">
                Expires on: {formattedDate}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CouponCard;
