import CouponCard from "../../components/couponComponent/CouponCard";
import MainLayout from "../../components/layout/MainLayout";

function Coupon() {
  return (
    <>
      <MainLayout>
      <div className="w-full min-h-[500px] bg-gray-100 flex items-center justify-center py-10">
        <div className="w-[90%] sm:w-[80%] lg:w-[70%] bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Coupons
          </h2>

          {/* Coupon grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <CouponCard />
          </div>
        </div>
      </div>
    </MainLayout>
    </>
  );
}

export default Coupon;
