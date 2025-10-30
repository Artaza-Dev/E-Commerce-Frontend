import ItemCards from "../ui/ItemCards";
// import Button from "../ui/Button";
import image1 from "../../assets/mobile3.jpg";
import image3 from "../../assets/mobile5.jpg";
import image4 from "../../assets/mobile6.jpg";
interface CardItem {
  image: string;
  title: string;
  price: number;
}
function ResultSection() {
  const CardsData: CardItem[] = [
    {
      image: image1,
      title: "I Phone 16 pro max",
      price: 999,
    },
    {
      image: image4,
      title: "Oppo a76",
      price: 659,
    },
    {
      image: image3,
      title: "Vivo V30",
      price: 775,
    },
    {
      image: image3,
      title: "Vivo V30",
      price: 775,
    },
    {
      image: image3,
      title: "Vivo V30",
      price: 775,
    },
    {
      image: image3,
      title: "Vivo V30",
      price: 775,
    },
    {
      image: image3,
      title: "Vivo V30",
      price: 775,
    },
    {
      image: image1,
      title: "Infinix Hot 40",
      price: 658,
    },
  ];
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-5 overflow-y-auto min-h-[550px] sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[750px] 2xl:h-[800px] hide-scrollbar">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold text-gray-800">Models</p>

        {/* Product Grid */}
        <div className="pt-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {CardsData.map((val, index) => (
              <ItemCards
                key={index}
                cardImage={val.image}
                cardTitle={val.title}
                cardPrice={val.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultSection;
