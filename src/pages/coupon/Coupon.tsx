import CouponCard from "../../components/couponComponent/CouponCard";
import MainLayout from "../../components/layout/MainLayout";
import { useEffect } from "react";
import couponStore from "../../store/couponStore";
import Loader from "react-js-loader";
function Coupon() {
  const { coupons, fetchCoupon, loading } = couponStore();

  useEffect(() => {
    fetchCoupon();
    console.log("coupon data", coupons);
  }, [fetchCoupon]);

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
  return (
    <>
      <MainLayout>
        <div className="w-full min-h-[500px] bg-gray-100 flex justify-center py-10 p-5">
          <div className="max-w-7xl w-full bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Coupons
            </h2>

            {coupons.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {coupons.map((coupon, index) => (
                  <CouponCard
                    key={index}
                    index={index}
                    isActive={coupon?.isActive}
                    code={coupon?.code}
                    discount={coupon?.discountValue}
                    expiry={coupon?.expiryDate}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-md md:text-xl font-bold text-gray-600 mt-10">
                No coupon added yet..
              </p>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Coupon;
