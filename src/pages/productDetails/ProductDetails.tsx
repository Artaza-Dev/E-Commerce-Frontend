import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import DetailsSection from "../../components/productDetailComponents/DetailsSection";
import ProductDetail from "../../components/productDetailComponents/ProductDetail";
import RatingReview from "../../components/productDetailComponents/RatingReview";
import { useParams } from "react-router-dom";
import productStore from "../../store/productStore";
import Loader from "react-js-loader";

function ProductDetails() {
  const { productId } = useParams();
  const { findProduct, loading } = productStore();
  const [activeTab, setActiveTab] = useState<string>("details");

  useEffect(() => {
    const fetchProductById = () => {
      window.scrollTo(0, 0);
      if (productId) {
        findProduct(productId);
      }
    };
    fetchProductById();
  }, [productId]);

  return (
    <div className="w-full min-h-screen">
      <MainLayout>
        {loading ? (
          <div className="flex justify-center my-5 min-h-[400px]">
            <Loader
              type="spinner-default"
              bgColor="#000000"
              color="#1D4ED8"
              size={90}
            />
          </div>
        ) : (
          <div>
            <DetailsSection />
            {/* Tabs Section */}
            <div className="w-full bg-white">
              {/* Tab Buttons */}
              <div className="w-full mx-auto flex justify-center items-center gap-8 sm:gap-20 py-4 sm:py-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`relative text-base sm:text-lg font-semibold transition-all duration-300 cursor-pointer
              ${
                activeTab === "details"
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
                >
                  Product Details
                  <span
                    className={`absolute left-0 -bottom-1 h-[3px] w-full bg-black transition-all duration-300 
                ${
                  activeTab === "details" ? "scale-x-100" : "scale-x-0"
                } origin-left`}
                  ></span>
                </button>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`relative text-base sm:text-lg font-semibold transition-all duration-300 cursor-pointer
              ${
                activeTab !== "details"
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
                >
                  Rating & Reviews
                  <span
                    className={`absolute left-0 -bottom-1 h-[3px] w-full bg-black transition-all duration-300 
                ${
                  activeTab !== "details" ? "scale-x-100" : "scale-x-0"
                } origin-left`}
                  ></span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="w-full mx-auto px-10 py-5 text-gray-700">
                {activeTab === "details" ? <ProductDetail /> : <RatingReview />}
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </div>
  );
}

export default ProductDetails;
