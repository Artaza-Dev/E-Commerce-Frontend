import React, { useState, useMemo, useEffect } from "react";
import productStore from "../../store/productStore";
import MainLayout from "../../components/layout/MainLayout";
import AddressCard from "../../components/checkoutComponent/AddressCard";
import { useNavigate } from "react-router-dom";
import orderStore from "../../store/orderStore";
import { toast } from "react-toastify";
import Loader from "react-js-loader";
interface CartItem {
  id: string;
  name: string;
  color: string;
  rom: string;
  image: string;
  price: number;
  quantity: number;
  variantQuantity: number;
  productId: string;
  variantId: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { fetchCartItems, deleteCartItems, discount, productLoading } = productStore();
  const { createOrder } = orderStore();
  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  // Fetch cart items from backend
  useEffect(() => {
    const getItems = async () => {
      const res = (await fetchCartItems()) as any;
      if (res.success && res.data?.items) {
        const formattedItems = res.data.items.map((item: any) => ({
          id: item._id,
          name: item.product?.name || "Unnamed Product",
          color: item.variant?.color || "N/A",
          rom: item.variant?.storage || "N/A",
          image: item.product?.images?.[0] || "",
          price: item.variant?.price || item.product?.baseprice || 0,
          quantity: item.quantity || 1,
          // use these attributes to increase and decrease items in cart.
          variantQuantity: item.variant?.quantity,
          productId: item.product?._id,
          variantId: item.variant?._id,
        }));
        setLocalCart(formattedItems);
      }
    };
    getItems();
  }, [fetchCartItems, deleteCartItems]);

  // Calculate summary values dynamically
  const { subtotal, deliveryFee, totalItems, discountedTotal } = useMemo(() => {
    const subtotal = localCart.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );

    const deliveryFee = localCart.length > 0 ? localCart.length * 200 : 0;
    const totalItems = localCart.reduce((acc, item) => acc + item.quantity, 0);

    const total = subtotal + deliveryFee;
    const discountAmount = (total * (discount || 0)) / 100;
    const discountedTotal = total - discountAmount;

    return { subtotal, deliveryFee, totalItems, total, discountedTotal };
  }, [localCart]);

  // use Address
  const onUseAddress = (address: any) => {
    setSelectedAddress(address);
    setSelectedAddressId(address._id);
  };

  // Place order handler
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address before placing the order");
      return;
    }
    const orderData = {
      items: localCart.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        image: item.image,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: selectedAddress,
      totalAmount: discountedTotal,
      discountAmount: subtotal + deliveryFee - discountedTotal,
      paymentMethod: "COD",
    };

    const result = await createOrder(orderData as any);
    if (result.success) {
      toast.success("Order placed successfully!");
      productStore.setState({ cartItems: [] })
      setTimeout(() => navigate("/ordersuccess"), 1000);
    } else {
      toast.error(result.message || "Failed to place order!");
    }
  };

  return (
    <>
      <MainLayout>
        {productLoading ? (
          <div className="flex justify-center my-5 min-h-[400px]">
            <Loader
              type="spinner-default"
              bgColor="#000000"
              color="#1D4ED8"
              size={90}
            />
          </div>
        ) : (
          <div className="min-h-screen bg-gray-100">
            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT SECTION - FORM */}
                <div className="w-full lg:col-span-2 bg-white rounded-2xl shadow-md p-5 sm:p-8 space-y-8 transition-all duration-300">
                  {/* Tabs Header */}
                  <div className="w-full flex justify-between items-center">
                    <div className="text-2xl font-bold">Your Address</div>
                    <div>
                      <button
                        className="w-full font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 cursor-pointer bg-black text-white hover:bg-gray-700"
                        onClick={() => navigate("/createaddress")}
                      >
                        Add New Address
                      </button>
                    </div>
                  </div>
                  {/* Tab Content */}
                  <div className="w-full bg-gray-50 rounded-xl shadow-inner px-5 sm:px-8 py-6 transition-all duration-500 flex flex-col items-center gap-3">
                    <AddressCard
                      setAddress={onUseAddress}
                      selectedAddressId={selectedAddressId}
                    />
                  </div>
                </div>

                {/* RIGHT SECTION - ORDER SUMMARY */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                    <h2 className="text-xl font-semibold text-black mb-4">
                      Order Summary
                    </h2>

                    {/* Cart Items */}
                    <div className="space-y-4 mb-6">
                      {localCart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 pb-4 border-b border-gray-200"
                        >
                          <div className="w-15 h-18 overflow-hidden rounded-xl">
                            <img
                              src={item?.image}
                              alt=""
                              className="w-20 h-20"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-black">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-gray-600">
                                Quantity: {item.quantity}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-black">
                              Rs {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Total Items</span>
                        <span>{totalItems}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>Rs {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>Rs {deliveryFee.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Discount</span>
                        <span>{discount || 0}%</span>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between text-lg font-bold text-black">
                          <span>Total</span>
                          <span>Rs {discountedTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Complete Order Button */}
                    <button
                      className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      By completing this order, you agree to our terms and
                      conditions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default CheckoutPage;
