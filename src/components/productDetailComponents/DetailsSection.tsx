import { useState } from "react";
import image1 from "../../assets/mobile3.jpg";
import image3 from "../../assets/mobile6.jpg";
import type { Product } from "../../store/productStore";
interface DetailsSectionProps {
  products: Product | null;
}
function DetailsSection({ products }: DetailsSectionProps) {
  if (!products) {
    return (
      <p className="text-center text-gray-500 py-10">
        Loading product details...
      </p>
    );
  }

  const images = [products.image, image1, image3];

  // 👇 State for currently selected image (default = first)
  const [mainImage, setMainImage] = useState<string>(images[0]);

  // 👇 Handler to change main image when thumbnail clicked
  const handleThumbnailClick = (img: string) => {
    setMainImage(img);
  };
  return (
    <>
      <div className="w-full bg-gray-100 py-6 sm:py-10 lg:py-14 2xl:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8 ">
            {/* LEFT SECTION - PRODUCT IMAGES */}
            <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-2">
              {/* ✅ MAIN IMAGE */}
              <div className="w-full lg:w-[75%] rounded-2xl overflow-hidden border-gray-200">
                <img
                  src={mainImage}
                  alt="main"
                  className="w-full h-[350px] sm:h-[400px] lg:h-[480px] rounded-2xl object-cover transition-all duration-300"
                />
              </div>

              {/* ✅ THUMBNAIL IMAGES */}
              <div className="flex lg:flex-col justify-center items-center gap-3 mt-4 lg:mt-0 lg:w-[25%]">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => handleThumbnailClick(img)}
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                      mainImage === img
                        ? "border-black scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${index}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SECTION - DETAILS */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {products.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <p className="text-yellow-500 text-lg">★★★★★</p>
                <span className="text-gray-600 text-sm">4.5/5</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-semibold text-gray-800">
                Rs {products.price}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base">
                {products.description}
              </p>

              {/* Color Options */}
              <div>
                <p className="font-semibold text-gray-800 mb-2">Select Color</p>
                <div className="flex space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-800 cursor-pointer border-2 border-gray-300 hover:border-black"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-900 cursor-pointer border-2 border-gray-300 hover:border-black"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-900 cursor-pointer border-2 border-gray-300 hover:border-black"></div>
                </div>
              </div>

              {/* ROM Options */}
              <div>
                <p className="font-semibold text-gray-800 mb-2">Choose ROM</p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 rounded-full border text-gray-800 hover:bg-black hover:text-white cursor-pointer transition">
                    64GB
                  </button>
                  <button className="px-4 py-2 rounded-full border text-gray-800 hover:bg-black hover:text-white cursor-pointer transition">
                    128GB
                  </button>
                  <button className="px-4 py-2 rounded-full border text-gray-800 hover:bg-black hover:text-white cursor-pointer transition">
                    256GB
                  </button>
                  <button className="px-4 py-2 rounded-full border text-gray-800 hover:bg-black hover:text-white cursor-pointer transition">
                    512GB
                  </button>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center border rounded-full mb-3">
                  <button className="px-4 py-2 text-xl font-semibold cursor-pointer hover:text-zinc-600">
                    -
                  </button>
                  <span className="px-3 text-xl">1</span>
                  <button className="px-4 py-2 text-xl font-semibold cursor-pointer hover:text-zinc-600">
                    +
                  </button>
                </div>
                <button className="flex-1 bg-black text-white py-3 rounded-full mb-3 hover:bg-gray-800 transition cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsSection;
