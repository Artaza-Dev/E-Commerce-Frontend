import ItemCards from "../ui/ItemCards";
import Button from "../ui/Button";
import image1 from "../../assets/mobile3.jpg";
import image3 from "../../assets/mobile5.jpg";
import image4 from "../../assets/mobile6.jpg";
function TopSellingSection() {
  interface CardItem {
    image: string;
    title: string;
    price: number;
  }

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
      image: image1,
      title: "Infinix Hot 40",
      price: 658,
    },
  ];
  return (
    <>
      <div className="w-full min-h-[400px] p-5">
        <div className="w-full h-24 flex items-center justify-center">
          <p className="text-4xl font-bold">TOP SELLINGS</p>
        </div>
        <div className="w-full py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {CardsData.map((val, index) => {
              return (
                <ItemCards
                  key={index}
                  cardImage={val.image}
                  cardTitle={val.title}
                  cardPrice={val.price}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full h-24 flex items-center justify-center">
          <Button />
        </div>
      </div>
    </>
  );
}

export default TopSellingSection;
