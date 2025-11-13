import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import OrderTrackingCard from "../../components/ui/OrderTrackingCard";
import PopupCard from "../../components/ui/PopupCard";

function Orders() {
  const [popup, setPopup] = useState(false);
  const [productId, setProductId] = useState<string>("")
  const popupHandler = ( prodId: string) => {
    setProductId(prodId)
    setPopup(true);
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-6 sm:p-10 relative">
        {popup && (
          <PopupCard
            onClose={() => setPopup(false)}
            id = {productId}
          />
        )}
        <OrderTrackingCard onOpen={popupHandler}/>
      </div>
    </MainLayout>
  );
}

export default Orders;
