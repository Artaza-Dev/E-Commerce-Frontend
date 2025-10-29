import Button from "../ui/Button";
import image1 from "../../assets/mobile3.jpg";
import image3 from "../../assets/mobile5.jpg";
import image4 from "../../assets/mobile6.jpg";
import ItemCards from "../ui/ItemCards";
import { useState, useEffect } from "react";
interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  color: string;
  rom: string;
  display: string;
  camera: string;
  battery: string;
  processor: string;
  description: string;
  image: string;
}

function NewModelSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const productData: Product[] = [
    {
      id: 1,
      name: "iPhone 17 Pro Max",
      brand: "Apple",
      price: 1499,
      color: "Titanium Gray",
      rom: "1TB",
      display: "6.9-inch Super Retina XDR",
      camera: "48MP + 12MP + 12MP Triple Camera",
      battery: "4,800 mAh",
      processor: "A19 Bionic Chip",
      description:
        "The iPhone 17 Pro Max combines cutting-edge design with lightning-fast performance, featuring a 6.9-inch display and A19 chip.",
      image: image1,
    },
    {
      id: 2,
      name: "iPhone 17 Pro Max",
      brand: "Apple",
      price: 1399,
      color: "Natural Titanium",
      rom: "512GB",
      display: "6.9-inch Super Retina XDR",
      camera: "48MP + 12MP + 12MP Triple Camera",
      battery: "4,800 mAh",
      processor: "A19 Bionic Chip",
      description:
        "Experience elegance and power with the Natural Titanium iPhone 17 Pro Max featuring unmatched performance.",
      image: image3,
    },
    {
      id: 3,
      name: "iPhone 17 Pro Max",
      brand: "Apple",
      price: 1299,
      color: "Blue Titanium",
      rom: "256GB",
      display: "6.9-inch Super Retina XDR",
      camera: "48MP + 12MP + 12MP Triple Camera",
      battery: "4,800 mAh",
      processor: "A19 Bionic Chip",
      description:
        "The Blue Titanium iPhone 17 Pro Max delivers beauty and performance with an ultra-efficient A19 chip.",
      image: image4,
    },
  ];
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(productData));
  }, []);

  // Get from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("products");
    if (storedData) {
      setProducts(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
      <div className="w-full min-h-[400px] p-5">
        <div className="w-full h-24 flex items-center justify-center">
          <p className="text-4xl font-bold">NEW ARRIVALS</p>
        </div>
        <div className="w-full py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {products.map((val, index) => {
              return (
                <ItemCards
                  key={index}
                  cardImage={val.image}
                  cardTitle={val.name}
                  cardPrice={val.price}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full h-24 flex items-center justify-center">
          <Button/>
        </div>
      </div>
    </>
  );
}

export default NewModelSection;
