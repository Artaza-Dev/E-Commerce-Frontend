import image1 from '../../assets/mobile3.jpg'
import image2 from '../../assets/mobile4.jpg'
import image3 from '../../assets/mobile6.jpg'
interface CardItem {
  image: string;
  title: string;
  price: number;
}
import ItemCards from '../ui/ItemCards';
function WishProducts() {
    
    const CardsData: CardItem[] = [
    {
      image: image1,
      title: "I Phone 16 pro max",
      price: 999,
    },
    {
      image: image2,
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
      <div className="w-full bg-gray-100 p-10">
        <div className="w-full h-14 mb-8 flex items-center justify-center">
            <p className="text-2xl font-bold ">WishList Products</p>
        </div>
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
    </>
  );
}

export default WishProducts;
