import React, { useState } from "react";

import { Trash2 } from "lucide-react";
import MainLayout from "../../components/layout/MainLayout";
import AddAddress from "../../components/checkoutComponent/AddAddress";

// ✅ Cart item type
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 129.99,
      quantity: 1,
      image: "🎧",
    },
    { id: 2, name: "Smart Watch", price: 299.99, quantity: 1, image: "⌚" },
    { id: 3, name: "Laptop Stand", price: 49.99, quantity: 2, image: "💻" },
  ]);

  const [activeTab, setActiveTab] = useState<string>("saveAddress");

  // ✅ Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 15.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Remove item
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <>
      <MainLayout>
        <div className="min-h-screen bg-gray-100">
          {/* MAIN CONTENT */}
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* LEFT SECTION - FORM */}
              <div className="w-full lg:col-span-2 bg-white rounded-2xl shadow-md p-5 sm:p-8 space-y-8 transition-all duration-300">
                {/* Tabs Header */}
                <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-6 sm:gap-10 border-b border-gray-200 pb-3">
                  {/* Add Shipping Address Tab */}
                  <button
                    onClick={() => setActiveTab("saveAddress")}
                    className={`relative text-base sm:text-lg font-semibold transition-all duration-300 pb-2
        ${
          activeTab === "saveAddress"
            ? "text-black after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-black"
            : "text-gray-500 hover:text-black"
        }`}
                  >
                    Add Shipping Address
                  </button>

                  {/* Saved Address Tab */}
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`relative text-base sm:text-lg font-semibold transition-all duration-300 pb-2
        ${
          activeTab !== "saveAddress"
            ? "text-black after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-black"
            : "text-gray-500 hover:text-black"
        }`}
                  >
                    Saved Address
                  </button>
                </div>

                {/* Tab Content */}
                <div className="w-full bg-gray-50 rounded-xl shadow-inner px-5 sm:px-8 py-6 transition-all duration-500">
                  {activeTab === "saveAddress" ? (
                      <AddAddress/>
                  ) : (
                    <div className="text-center sm:text-left animate-fadeIn">
                      <p className="text-gray-700 text-base sm:text-lg font-medium">
                        Your saved addresses will appear here.
                      </p>
                    </div>
                  )}
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
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 pb-4 border-b border-gray-200"
                      >
                        <div className="text-4xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-medium text-black">
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="text-sm text-gray-600">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-black">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 mt-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between text-lg font-bold text-black">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Complete Order Button */}
                  <button className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    Proceed to pay
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
      </MainLayout>
    </>
  );
};

export default CheckoutPage;
