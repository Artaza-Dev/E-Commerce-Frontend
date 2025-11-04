import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import DetailsSection from "../../components/productDetailComponents/DetailsSection";
import ProductDetail from "../../components/productDetailComponents/ProductDetail";
import RatingReview from "../../components/productDetailComponents/RatingReview";
import { useParams } from "react-router-dom";
import productStore from "../../store/productStore";
function ProductDetails() {
  const { productId } = useParams();
  const { findProduct } = productStore()
  const [activeTab, setActiveTab] = useState<string>("details");
  useEffect(()=>{
    function sendProductId(){
        console.log("id in page",productId);
        findProduct(( productId as string))
    }
    sendProductId()
  },[productId])
  

  return (
    <>
      <div className="w-full min-h-screen">
        <MainLayout>
          <DetailsSection/>
          {/* Tabs Section */}
          <div className="w-full bg-white">
            <div className="w-full mx-auto flex justify-center items-center gap-8 sm:gap-20 py-4 sm:py-6">
              {/* Product Details Tab */}
              <button
                onClick={() => setActiveTab("details")}
                className={`relative text-base sm:text-lg font-semibold transition-all duration-300 cursor-pointer
                ${activeTab === "details" ? "text-black" : "text-gray-500 hover:text-black"}`}
              >
                Product Details
                <span
                  className={`absolute left-0 -bottom-1 h-[3px] w-full bg-black transition-all duration-300 
                  ${activeTab === "details" ? "scale-x-100" : "scale-x-0"} origin-left`}
                ></span>
              </button>

              {/* Rating & Reviews Tab */}
              <button
                onClick={() => setActiveTab("reviews")}
                className={`relative text-base sm:text-lg font-semibold transition-all duration-300 cursor-pointer
                ${activeTab !== "details" ? "text-black" : "text-gray-500 hover:text-black"}`}
              >
                Rating & Reviews
                <span
                  className={`absolute left-0 -bottom-1 h-[3px] w-full bg-black transition-all duration-300 
                  ${activeTab !== "details" ? "scale-x-100" : "scale-x-0"} origin-left`}
                ></span>
              </button>
            </div>

            {/* Conditional Rendering (Tab Content) */}
            <div className="w-full mx-auto px-10 py-5 text-gray-700">
              {activeTab === "details" ? (
                <>
                <ProductDetail detail={currentProduct}/>
                </>
              ) : (
                <>
                <RatingReview/>
                </>
              )}
            </div>
          </div>
        </MainLayout>
      </div>
    </>
  );
}

export default ProductDetails;
