import React, { useState } from "react";
import { Trash,Plus, Minus } from 'lucide-react';
import image1 from "../../assets/mobile5.jpg";
import image2 from "../../assets/mobile6.jpg";
interface CartItem {
  id: number;
  name: string;
  color: string;
  rom: string;
  image: string;
  price: number;
  quantity: number;
}

const CartSection: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "iPhone 17 Pro Max",
      color: "Titanium Gray",
      rom: "1TB",
      image: image1,
      price: 1499,
      quantity: 1,
    },
    {
      id: 2,
      name: "iPhone 17 Pro Max",
      color: "Natural Titanium",
      rom: "512GB",
      image: image2,
      price: 1399,
      quantity: 1,
    },
    
  ]);

  //  Increase quantity
  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  //  Decrease quantity
  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  //  Remove product
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full bg-white p-5 sm:p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
         Your Cart
      </h2>

      {/* Scrollable Product List */}
      <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hide-scrollbar">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start justify-between 
                         bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 sm:w-24 sm:h-24">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    ROM:{" "}
                    <span className="font-medium text-gray-800">
                      {item.rom}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Color:{" "}
                    <span className="font-medium text-gray-800">
                      {item.color}
                    </span>
                  </p>
                  <p className="font-bold text-gray-900 text-lg mt-2">
                    ${item.price}
                  </p>
                </div>
              </div>

              {/* Quantity & Delete */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 sm:mt-0">
                <div className="flex items-center bg-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="p-2 text-gray-700 hover:bg-gray-300 transition-all cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 font-medium text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="p-2 text-gray-700 hover:bg-gray-300 transition-all cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-all cursor-pointer"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 mt-10">
            Your cart is empty 🛍️
          </p>
        )}
      </div>
    </div>
  );
};

export default CartSection;
