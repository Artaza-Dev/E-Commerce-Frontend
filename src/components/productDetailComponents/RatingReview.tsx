import { useEffect } from "react";
import ReviewCard from "../ui/ReviewCard";
import productStore from "../../store/productStore";

function RatingReview() {
  const { currentProduct } = productStore();
  useEffect(() => {
    const fetchProduct = async () => {
      await currentProduct;
      console.log(currentProduct);
      
    };
    fetchProduct();
  }, []);

  return (
    <div className="w-full min-h-[300px] bg-gray-100 rounded-2xl p-5">
      <div className="w-full h-14 flex items-center">
        <p className="text-xl font-bold pr-2">All Reviews</p>
        <p className="text-sm text-zinc-600">
          ({currentProduct?.numOfReviews})
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {currentProduct?.reviews?.map((val, index) => (
          <ReviewCard
            key={index}
            name={val?.name}
            comment={val?.comment}
            date={new Date(currentProduct?.createdAt).toLocaleDateString()}
            rating={val?.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default RatingReview;
