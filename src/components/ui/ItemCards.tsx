import { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
  cardImage: string;
  cardTitle: string;
  cardPrice: number;
  productId: number;
}

const ItemCards: React.FC<ItemCardProps> = ({
  cardImage,
  cardTitle,
  cardPrice,
  productId,
}) => {
  const navigate = useNavigate();
  const [wish, setWish] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-200">
        <img
          src={cardImage}
          alt={cardTitle}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between h-[140px]">
        <div className="flex justify-between w-full h-20">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{cardTitle}</h3>
            <p className="text-gray-600 font-medium text-xl">${cardPrice}</p>
          </div>
          <div>
            <Heart
              className={`mt-1 text-xl ${
                wish
                  ? "text-red-500 hover:text-red-600"
                  : "text-black hover:text-gray-800"
              } cursor-pointer`}
              onClick={() => setWish(!wish)}
            />
          </div>
        </div>

        <button
          onClick={() => navigate(`/productDetails/${productId}`)}
          className="mt-2 w-full bg-black text-white text-sm font-semibold py-3 mb-2 rounded-xl hover:bg-gray-800 transition cursor-pointer"
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ItemCards;
