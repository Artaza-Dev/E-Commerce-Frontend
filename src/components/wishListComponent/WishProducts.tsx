import { useEffect, useState } from "react";
import productStore from "../../store/productStore";
import ItemCards from "../ui/ItemCards";

interface Product {
  images: string[];
  name: string;
  baseprice: number;
  _id: string;
}

interface WishItem {
  product: Product;
}

function WishProducts() {
  const { fetchWishListItems } = productStore();
  const [items, setItems] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch wishlist items from backend (using Zustand function)
        const response = await fetchWishListItems();

        if (response?.success && response?.data?.wishlistItems) {
          setItems(response.data.wishlistItems);
        } else {
          setItems([]);
        }
      } catch (err: any) {
        setError("Failed to load wishlist items");
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [fetchWishListItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading wishlist...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 p-10 min-h-screen">
      <div className="w-full h-14 mb-8 flex items-center justify-center">
        <p className="text-2xl font-bold">WishList Products</p>
      </div>

      {items?.length === 0 ? (
        <div className="text-center text-gray-600 font-medium">
          No products in your wishlist
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {items?.map((val, index) => (
            <ItemCards
              key={index}
              cardImage={val?.product?.images?.[0]}
              cardTitle={val?.product?.name}
              cardPrice={val?.product?.baseprice}
              productId={val?.product?._id}
              onWishToggle={() => {
                setItems((prev) =>
                  prev.filter((item) => item.product._id !== val.product._id)
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishProducts;
