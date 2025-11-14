import { useState } from "react";
import productStore from "../../store/productStore";
import { toast } from "react-toastify";
interface IProps {
  onClose: () => void;
  productId: string;
}

const PopupCard: React.FC<IProps> = ({ onClose, productId }) => {
  const { createReview } = productStore()
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const reviewHandler = async ()=>{
    const data ={
      productId: productId,
      rating,
      comment,
    }
    let result = await createReview(data)
    if(!result.success){
      toast.error("Error in creating review")
      setTimeout(() => onClose() , 500);
    }else{
      toast.success("Thank you for submission")
      setTimeout(() => onClose() , 500);
    }
  }

  return (
    <div
      className="fixed flex items-center justify-center inset-0 bg-black/40 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-44 w-[90%] sm:w-[420px] bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 animate-fadeIn transition-all duration-300"
        
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Leave a Review
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              } transition-colors`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black/30 resize-none h-24 mb-4"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition cursor-pointer" onClick={reviewHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
