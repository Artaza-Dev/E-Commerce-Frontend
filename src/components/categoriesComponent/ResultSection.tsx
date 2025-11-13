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
  const { categoryItems, fetchProductByCategory, selectedCategory, loading } =
    productStore();
  useEffect(() => {
    const init = async () => {
      window.scrollTo(0, 0);
      const cat =
        selectedCategory ||
        localStorage.getItem("selectedCategory") ||
        "AllProducts";
      if (!Array.isArray(categoryItems) || categoryItems.length === 0) {
        await fetchProductByCategory(cat);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (Array.isArray(categoryItems)) {
      setItems(categoryItems as CardItem[]);
    } else {
      setItems([]);
    }
  }, [categoryItems]);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-5 overflow-y-auto min-h-[550px] sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[750px] 2xl:h-[800px] hide-scrollbar">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold text-gray-800">Models</p>

        {/* Product Grid */}
        <div className="pt-4">
          {loading ? (
            <div className="flex justify-center items-center my-5 min-h-[300px]">
              <Loader
                type="spinner-default"
                bgColor="#000000"
                color="#1D4ED8"
                size={90}
              />
            </div>
          ) : items?.length > 0 ? (
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
            <p className="text-center text-md md:text-3xl font-bold text-gray-600 mt-10">
              No product found in this category...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultSection;
