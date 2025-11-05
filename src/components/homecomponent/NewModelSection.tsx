import Button from "../ui/Button";
import ItemCards from "../ui/ItemCards";
import productStore from "../../store/productStore";
import { useEffect } from "react";
function NewModelSection() {
  const { product,  fetchProducts } = productStore();
  useEffect(()=>{
    fetchProducts()
    
  }, [])
  console.log(product);
  
  return (
    <>
      <div className="w-full min-h-[400px] p-5">
        <div className="w-full h-24 flex items-center justify-center">
          <p className="text-4xl font-bold">NEW ARRIVALS</p>
        </div>
        <div className="w-full py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {product?.map((val: any, index: number) => {
              return (
                <ItemCards
                  key={index}
                  cardImage={val?.images[0]}
                  cardTitle={val?.name}
                  cardPrice={val?.baseprice}
                  productId={val?._id}
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
