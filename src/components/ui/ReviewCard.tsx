import { FaStar } from "react-icons/fa";

interface ReviewCardProps {
  name: string;
  comment: string;
  date: string;
  rating: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  comment,
  date,
  rating,
}) => {
  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300 mx-auto">
      {/* Stars */}
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-lg ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-semibold text-gray-900">{name}</h3>
      </div>

      {/* Comment */}
      <p className="text-gray-700 text-sm leading-relaxed mb-3 h-16 overflow-y-auto hide-scrollbar">{comment}</p>

      {/* Date */}
      <p className="text-gray-500 text-xs">Posted on {date}</p>
    </div>
  );
};

export default ReviewCard;
