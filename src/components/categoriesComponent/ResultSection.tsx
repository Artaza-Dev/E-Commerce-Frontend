import ItemCards from "../ui/ItemCards";
import productStore from "../../store/productStore";
import { useEffect, useState } from "react";
import Loader from "react-js-loader";

interface CardItem {
  images: string[];
  name: string;
  baseprice: number;
  _id: string;
}

function ResultSection() {
  const [items, setItems] = useState<CardItem[]>([]);

  const {
    categoryItems,
    fetchProductByCategory,
    selectedCategory,
    categoryloading,
  } = productStore();

  useEffect(() => {
    const init = async () => {
      window.scrollTo(0, 0);
      const category =
        selectedCategory ||
        localStorage.getItem("selectedCategory") ||
        "AllProducts";

      if (!categoryItems.length) {
        await fetchProductByCategory(category);
      }
    };
    init();
  }, []);

  useEffect(() => {
    setItems(Array.isArray(categoryItems) ? categoryItems : []);
  }, [categoryItems]);

  if (categoryloading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader
          type="spinner-default"
          bgColor="#000"
          color="#1D4ED8"
          size={80}
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800">Models</h2>

      <div className="mt-6">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((val, index) => (
              <ItemCards
                key={index}
                cardImage={val.images[0]}
                cardTitle={val.name}
                cardPrice={val.baseprice}
                productId={val._id}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl mt-20">
            No product found in this category...
          </p>
        )}
      </div>
    </div>
  );
}

export default ResultSection;
