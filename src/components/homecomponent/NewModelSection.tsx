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
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition cursor-pointer"
            >
              {loading ? "Loading..." : "Load More"}
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
