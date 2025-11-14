import React, { useEffect, useState } from "react";
import { Trash, Plus, Minus } from "lucide-react";
import productStore from "../../store/productStore";
import Loader from "react-js-loader";
import { toast } from "react-toastify";
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

const CartSection: React.FC = () => {
  const { fetchCartItems, loading, deleteCartItems, addToCart } =
    productStore();
  const [localCart, setLocalCart] = useState<CartItem[]>([]);

  // Fetch cart items from backend
  useEffect(() => {
    const getItems = async () => {
      window.scrollTo(0, 0);
      const res = (await fetchCartItems()) as any;
      console.log("data fetch from backend..", res.data?.items);

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
        productStore.setState({ cartThings: formattedItems });
      }
    };
    getItems();
  }, [fetchCartItems, deleteCartItems]);

  useEffect(() => {
    productStore.setState({ cartItems: localCart });
  }, [localCart]);

  // (limit the quantity or increase)
  const increaseQuantity = async (
    id: string,
    productId: string,
    variantId: string,
    variantQuantity: number,
    quantity: number
  ) => {
    setLocalCart((prev) => {
      const updatedCart = prev.map((item) => {
        if (item.id === id) {
          if (item.quantity < item.variantQuantity) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            toast.error(
              `Only ${item.variantQuantity} items available in stock`
            );
            return item;
          }
        }
        return item;
      });
      productStore.setState({ cartThings: updatedCart });

      return updatedCart;
    });

    try {
      const newQuantity = quantity + 1;
      if (newQuantity <= variantQuantity) {
        const res = await addToCart({
          productId,
          variantId,
          quantity: 1,
          variantMaxQuantity: variantQuantity,
        } as any);
        console.log("Cart updated:", res.message);
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (
    id: string,
    productId: string,
    variantId: string,
    variantQuantity: number
  ) => {
    setLocalCart((prev) => {
      const updatedCart = prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      productStore.setState({ cartThings: updatedCart });

      return updatedCart;
    });
    try {
      const res = await addToCart({
        productId,
        variantId,
        quantity: -1,
        variantMaxQuantity: variantQuantity,
      } as any);
      console.log("Quantity decreased:", res.message);
    } catch (err) {
      console.error("Error decreasing cart quantity:", err);
    }
  };

  //  Remove product
  const removeItem = async (id: string) => {
    const res = await deleteCartItems(id);
    if (res.success) {
      setLocalCart((prev) => {
        const updatedCart = prev.filter(
          (item) => item.id !== id && item.id !== id
        );
        productStore.setState({ cartThings: updatedCart });

        return updatedCart;
      });

      toast.success(res.message || "Item removed");
    } else {
      toast.error(res.message || "Failed to delete cart item");
    }
  };

  // const removeItem = async (id: string) => {
  //   const res = await deleteCartItems(id);
  //   if (res.success) {
  //     setLocalCart((prev) =>
  //       prev.filter((item) => item.id !== id && item.id !== id)
  //     );

  //     productStore.setState((state) => {
  //       const updatedItems = state.cartItems.filter(
  //         (item: any) => item.id !== id && item.id !== id
  //       );
  //       return {
  //         cartItems: updatedItems,
  //         cartLength: updatedItems.length,
  //       };
  //     });

  //     toast.success(res.message || "Item removed");
  //   } else {
  //     toast.error(res.message || "Failed to delete cart item");
  //   }
  // };

  // Conform products to view summery

  // const conformProductsHandler = (localCart: CartItem[]) => {
  //   addItemsToSummary(localCart);
  //   setIsActive(false);
  // };
  return (
    <div className="w-full min-h-[460px] bg-white p-5 sm:p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        Your Cart
      </h2>
      {loading ? (
        <div className="flex justify-center my-5 min-h-[300px]">
          <Loader
            type="spinner-default"
            bgColor="#000000"
            color="#1D4ED8"
            size={90}
          />
        </div>
      ) : (
        <>
          {/* Scrollable Product List */}
          <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hide-scrollbar">
            {localCart.length > 0 ? (
              localCart.map((item) => (
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
                        Storage:{" "}
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
                        Rs {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 sm:mt-0">
                    <div className="flex items-center bg-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id,
                            item.productId,
                            item.variantId,
                            item.variantQuantity
                          )
                        }
                        className="p-2 transition-all text-gray-700 hover:bg-gray-300 cursor-pointer"

                      >
                        <Minus size={14} />
                      </button>

                      {/* Quantity Display */}
                      <span
                        className="px-4 font-medium text-gray-800"
                      >
                        {item.quantity}
                      </span>

                      {/* Increase Button */}
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id,
                            item.productId,
                            item.variantId,
                            item.variantQuantity,
                            item.quantity
                          )
                        }
                        className="p-2 transition-all text-gray-700 hover:bg-gray-300 cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="transition-all
                      text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 mt-10">
                Your cart is empty ...
              </p>
            )}
          </div>

          {/* <button
            className="w-full bg-black text-white py-3 mt-5 rounded-lg font-semibold text-lg hover:bg-gray-800 transition flex justify-center items-center gap-2 cursor-pointer"
            onClick={() => conformProductsHandler(localCart)}
          >
            Conform products
            <ArrowRight />
          </button> */}
        </>
      )}
    </div>
  );
};

export default CartSection;
