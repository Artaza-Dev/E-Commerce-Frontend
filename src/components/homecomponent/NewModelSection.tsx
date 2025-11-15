import ItemCards from "../ui/ItemCards";
import productStore from "../../store/productStore";
import { useEffect } from "react";
import Loader from "react-js-loader";
function NewModelSection() {
  const { product, fetchProducts, hasNextPage, nextPage, loading } =
    productStore();
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts(1, 4, false);
  }, []);
  console.log(product);
  const handleLoadMore = () => {
    if (hasNextPage && !loading) {
      fetchProducts(nextPage, 4, true);
    }
  };

  return (
    <>
      <div className="w-full min-h-[400px] p-5">
        <div className="w-full h-24 flex items-center justify-center">
          <p className="text-4xl font-bold">NEW ARRIVALS</p>
        </div>
        <div className="w-full py-10">
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
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
              {product?.map((val: any, index: number) => {
                return (
                  <ItemCards
                    key={index}
                    cardImage={val?.images[0]}
                    cardTitle={val?.name}
                    cardPrice={val?.baseprice}
                    productId={val?._id}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="w-full h-24 flex items-center justify-center">
          {hasNextPage ? (
            <button className="group relative px-10 py-2.5 bg-black text-white text-lg font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer" onClick={handleLoadMore}
              disabled={loading}>
                  {/* Shine effect */}
                  <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

                  <span className="relative flex items-center space-x-2">
                    <span>{loading ? "Loading..." : "Load More"}</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>
          ) : (
            product.length > 0 && (
              <p className="text-gray-500">No more products</p>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default NewModelSection;
