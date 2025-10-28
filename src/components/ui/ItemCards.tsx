interface ItemCardProps {
  cardImage: string;
  cardTitle: string;
  cardPrice: number;
}
function ItemCards({ cardImage, cardTitle, cardPrice }: ItemCardProps) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 ">
        {/* Image Section */}
        <div className="w-full h-48 bg-gray-200">
          <img
            src={cardImage}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between h-[140px]">
          <h3 className="text-lg font-semibold text-gray-800">{cardTitle}</h3>
          <p className="text-gray-600 font-medium text-xl">${cardPrice}</p>

          <button className="mt-2 w-full cursor-pointer bg-black text-white text-sm font-semibold py-3 mb-2 rounded-xl hover:bg-gray-800 transition">
            View Product
          </button>
        </div>
      </div>
    </>
  );
}

export default ItemCards;
