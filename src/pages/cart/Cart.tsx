import CartSection from "../../components/cartComponent/CartSection";
import OrderSummery from "../../components/cartComponent/OrderSummery";
import MainLayout from "../../components/layout/MainLayout";
function Cart() {
  return (
    <>
      <div className="w-full min-h-screen">
        <MainLayout>
          <div
            className="w-full flex flex-col lg:flex-row justify-center lg:justify-between 
                   gap-8 lg:gap-10 bg-zinc-200 shadow-2xl p-6 sm:p-10"
          >
            {/* Cart Section */}
            <div className="flex-1 min-w-[350px]">
              <CartSection />
            </div>

            {/* Order Summary Section */}
            <div className="w-full lg:w-[380px] xl:w-[420px] 2xl:w-[480px]">
              <OrderSummery />
            </div>
          </div>
        </MainLayout>
      </div>
    </>
  );
}

export default Cart;
