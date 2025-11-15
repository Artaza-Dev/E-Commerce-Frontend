import CartSection from "../../components/cartComponent/CartSection";
import OrderSummery from "../../components/cartComponent/OrderSummery";
import MainLayout from "../../components/layout/MainLayout";

function Cart() {
  return (
    <MainLayout>
      <div className="w-full min-h-screen flex justify-center items-start bg-gray-100 py-6 px-4 sm:px-6 md:px-8">
        <div
          className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 lg:gap-10 shadow-2xl rounded-2xl p-6 sm:p-10"
        >
          {/* Cart Section */}
          <div className="flex-1 min-w-[300px] lg:min-w-[350px] overflow-x-auto">
            <CartSection />
          </div>

          {/* Order Summary Section */}
          <div className="w-full lg:w-[380px] xl:w-[420px] 2xl:w-[480px] shrink-0">
            <OrderSummery />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Cart;
