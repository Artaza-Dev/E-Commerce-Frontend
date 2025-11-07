import { useEffect, useState } from "react";
import productStore from "../../store/productStore";
import { useNavigate } from "react-router-dom";
function DetailsSection() {
  const navigate = useNavigate()
  const { currentProduct, addToCart } = productStore();
  const [mainImage, setMainImage] = useState<string>(null as any);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(null as any);
  const [quantity, setQuantity] = useState<number>(1);

  let image: string[] = [];
  currentProduct?.images.forEach((imgs) => {
    if (imgs) {
      image.push(imgs);
    }
  });

  //set initial variant.
  useEffect(() => {
    if (
      currentProduct &&
      currentProduct.variants &&
      currentProduct.variants.length > 0
    ) {
      const firstVariant = currentProduct.variants[0];
      setSelectedColor(firstVariant.color);
      setSelectedStorage(firstVariant.storage);
      setSelectedVariant(firstVariant);
    }
  }, [currentProduct]);
  // Set main image when product changes
  useEffect(() => {
    if (image.length > 0) {
      setMainImage(image[0]);
    }
  }, [currentProduct]);

  if (!currentProduct) {
    return (
      <p className="text-center text-gray-500 py-10">
        Loading product details...
      </p>
    );
  }
  //  Handler to change main image when thumbnail clicked
  const handleThumbnailClick = (img: string) => {
    setMainImage(img);
  };

  const findVariant = (color: string, storage: string) => {
    return currentProduct.variants.find(
      (v) => v.color === color && v.storage === storage
    );
  };

  //------------------- Increment and Decrement Handlers-----------------------
  const incrementHandler = () => {
    if (selectedVariant && quantity < selectedVariant.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };
  const decrementHandler = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  //-----------------------------------------------------------
  // ------------- Handle color and storage select ----------------
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);

    // keep same storage if possible
    const variant = findVariant(color, selectedStorage || "");
    if (variant) {
      setSelectedVariant(variant);
      setQuantity(1);
    }
  };
  //  Handle storage select
  const handleStorageSelect = (storage: string) => {
    setSelectedStorage(storage);

    const variant = findVariant(selectedColor || "", storage);
    if (variant) {
      setSelectedVariant(variant);
      setQuantity(1);
    }
  };
  // -----------------------------------------------------------
  const addToCartHandler = async () => {
    if (!currentProduct?._id || !selectedVariant?._id) {
    alert("Please select a valid product variant.");
    return;
  }
  if (selectedVariant?.quantity === 0) {
    alert("This variant is out of stock.");
    return;
  }
    let data ={ variantId: selectedVariant._id, productId: currentProduct._id, quantity, variantMaxQuantity: selectedVariant?.quantity}
    try {
     let result = await addToCart(data as any);
      if (result.success) {
      navigate(`/productDetails/${data.productId}`);
    } else {
      alert(result.message || "Something went wrong while adding to cart");
    }
    } catch (error) {
      alert()
    }
  };

  return (
    <>
      <div className="w-full bg-gray-100 py-6 sm:py-10 lg:py-14 2xl:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8 ">
            {/* LEFT SECTION - PRODUCT IMAGES */}
            <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-2 py-3">
              {/*  MAIN IMAGE */}
              <div className="w-full lg:w-[75%] rounded-2xl overflow-hidden border-gray-200">
                <img
                  src={mainImage}
                  alt="main"
                  className="w-full h-[350px] sm:h-[400px] lg:h-[480px] rounded-2xl object-cover transition-all duration-300"
                />
              </div>

              {/*  THUMBNAIL IMAGES */}
              <div className="flex lg:flex-col justify-center items-center gap-3 mt-4 lg:mt-0 lg:w-[25%]">
                {image.map((img, index) => (
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
                {currentProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <p className="text-yellow-500 text-lg">★★★★★</p>
                <span className="text-gray-600 text-sm">4.5/5</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-semibold text-gray-800">
                Rs {selectedVariant?.price || "N/A"}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base">
                {currentProduct?.description || "No description available."}
              </p>

              <div>
                {/* Select Color */}
                <p className="font-semibold text-gray-800 mb-2">Select Color</p>
                <div className="flex space-x-3">
                  {[
                    ...new Set(currentProduct.variants.map((v) => v.color)),
                  ].map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorSelect(color!)}
                      className={`px-4 py-2 rounded-full border transition 
          ${
            selectedVariant?.color === color
              ? "bg-black text-white border-black"
              : "text-gray-800 hover:bg-black hover:text-white"
          }`}
                    >
                      {color || "N/A"}
                    </button>
                  ))}
                </div>

                {/* Choose Specification */}
                <p className="font-semibold text-gray-800 mb-2 mt-4">
                  Choose Specification
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    ...new Set(currentProduct.variants.map((v) => v.storage)),
                  ].map((storage, index) => (
                    <button
                      key={index}
                      onClick={() => handleStorageSelect(storage!)}
                      className={`px-4 py-2 rounded-full border transition 
          ${
            selectedVariant?.storage === storage
              ? "bg-black text-white border-black"
              : "text-gray-800 hover:bg-black hover:text-white"
          }`}
                    >
                      {storage || "N/A"}
                    </button>
                  ))}
                </div>

                {/* Quantity + Add to Cart */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center border rounded-full mb-3">
                    <button
                      className="px-4 py-2 text-xl font-semibold cursor-pointer hover:text-zinc-600"
                      onClick={decrementHandler}
                    >
                      -
                    </button>
                    <span className="px-3 text-xl">{quantity}</span>
                    <button
                      className="px-4 py-2 text-xl font-semibold cursor-pointer hover:text-zinc-600"
                      onClick={incrementHandler}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="flex-1 bg-black text-white py-3 rounded-full mb-3 hover:bg-gray-800 transition cursor-pointer"
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Available Quantity: {selectedVariant?.quantity || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsSection;
