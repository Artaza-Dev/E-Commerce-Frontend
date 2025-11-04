import { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import productStore from "../../store/productStore";
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
  const { addProductToWishList } = productStore();
  const [wish, setWish] = useState<boolean>(false);
  function addWishProductId(id: number) {
     setWish(!wish)
     addProductToWishList(id)
     
  }

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
  {/* Image Section with Overlay */}
  <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
    <img
      src={cardImage}
      alt={cardTitle}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    
    {/* Gradient Overlay on Hover */}
    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Wishlist Icon - Positioned on Image */}
    <div className="absolute top-3 right-3 z-10">
      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-300">
        <Heart
          className={`w-5 h-5 cursor-pointer transition-all duration-300 ${
            wish
              ? "fill-red-500 text-red-500"
              : "text-gray-700 hover:text-red-500"
          }`}
          onClick={() => addWishProductId(productId)}
        />
      </div>
    </div>
  </div>

  {/* Content Section */}
  <div className="p-5 flex flex-col justify-between h-40">
    <div className="flex flex-col space-y-2">
      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
        {cardTitle}
      </h3>
      
      <div className="flex items-center space-x-2">
        <p className="text-2xl font-bold text-gray-900">
          ${cardPrice}
        </p>
      </div>
    </div>

    {/* Button with Animation */}
    <button
      onClick={() => navigate(`/productDetails/${productId}`)}
      className="relative mt-4 w-full bg-linear-to-r from-gray-900 to-gray-800 text-white text-sm font-bold py-2 rounded-xl overflow-hidden group/btn transition-all duration-300 hover:from-gray-800 hover:to-gray-700 cursor-pointer"
    >
      {/* Shine Effect */}
      <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
      
      <span className="relative flex items-center justify-center space-x-2">
        <span>View Product</span>
        <svg 
          className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  </div>
</div>
  );
};

export default ItemCards;
