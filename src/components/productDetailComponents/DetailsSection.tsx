import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaStar } from "react-icons/fa";
import productStore from "../../store/productStore";

function DetailsSection() {
  const navigate = useNavigate();
  const { currentProduct, addToCart } = productStore();

  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // SAFE IMAGES
  const images = useMemo(
    () => currentProduct?.images?.filter(Boolean) || [],
    [currentProduct]
  );

  // VARIANTS + OPTIONS
  const variants = currentProduct?.variants || [];

  const colors: string[] = [
    ...new Set(variants.map((v: any) => v.color)),
  ].filter(Boolean);

  const storages: string[] = [
    ...new Set(variants.map((v: any) => v.storage).filter(Boolean)),
  ];

  // SELECTED VARIANT
  const selectedVariant = useMemo(() => {
    if (!selectedColor) return null;

    // If product has NO storage options
    if (storages.length === 0) {
      return variants.find((v: any) => v.color === selectedColor) || null;
    }

    if (!selectedStorage) return null;

    return (
      variants.find(
        (v: any) =>
          v.color === selectedColor && v.storage === selectedStorage
      ) || null
    );
  }, [selectedColor, selectedStorage, variants, storages]);

  // AUTO SELECT FIRST VALID VARIANT
  useEffect(() => {
    if (!currentProduct || !variants.length) return;

    const firstAvailable = variants.find((v: any) => v.quantity > 0) || variants[0];

    if (!selectedColor) {
      setSelectedColor(firstAvailable.color);
    }

    if (storages.length > 0 && !selectedStorage) {
      setSelectedStorage(firstAvailable.storage);
    }

    setQuantity(1);
  }, [currentProduct, variants]);

  //  AUTO SELECT FIRST IMAGE
  useEffect(() => {
    if (images.length) setMainImage(images[0]);
  }, [images]);

  // THUMBNAIL CLICK HANDLER
  const handleThumbnailClick = (img: string) => {
    setMainImage(img);
  };

  // COLOR BUTTON STATE
  const getColorButtonState = (color: string) => {
    const variantsForColor = variants.filter((v: any) => v.color === color);

    const isSelected = selectedColor === color;
    const isDisabled = !variantsForColor.some((v: any) => v.quantity > 0);

    const isGrayedOut =
      storages.length > 0 &&
      selectedStorage &&
      !variantsForColor.some((v: any) => v.storage === selectedStorage);

    return {
      isSelected,
      isDisabled,
      isGrayedOut,
      canClick: !isDisabled,
    };
  };

  // STORAGE BUTTON STATE
  const getStorageButtonState = (storage: string) => {
    const variantsForStorage = variants.filter((v: any) => v.storage === storage);

    const isSelected = selectedStorage === storage;
    const isDisabled = !variantsForStorage.some((v: any) => v.quantity > 0);

    const isGrayedOut =
      selectedColor &&
      !variantsForStorage.some((v: any) => v.color === selectedColor);

    return {
      isSelected,
      isDisabled,
      isGrayedOut,
      canClick: !isDisabled,
    };
  };

  /** --------------------------------
   * COLOR SELECT
   --------------------------------*/
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);

    if (storages.length > 0) {
      const available = variants.find(
        (v: any) => v.color === color && v.quantity > 0
      );

      setSelectedStorage(available?.storage || storages[0]);
    }

    setQuantity(1);
  };

  // STORAGE SELECT
  const handleStorageSelect = (storage: string) => {
    const available = variants.find(
      (v: any) => v.storage === storage && v.quantity > 0
    );

    setSelectedStorage(storage);
    setSelectedColor(available?.color || colors[0]);
    setQuantity(1);
  };

  // QUANTITY
  const incrementHandler = () => {
    if (selectedVariant && quantity < selectedVariant.quantity) {
      setQuantity((q) => q + 1);
    }
  };

  const decrementHandler = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  // ADD TO CART
  const addToCartHandler = async () => {
    if (!currentProduct?._id) {
      return toast.error("Invalid product.");
    }

    if (!variants.length) {
      const data = {
        productId: currentProduct._id,
        variantId: null,
        quantity,
      };

      const res = await addToCart(data as any);
      if (res.success) toast.success("Product added to cart");
      return;
    }

    if (!selectedVariant?._id)
      return toast.error("Please select a valid variant.");

    const data = {
      productId: currentProduct._id,
      variantId: selectedVariant._id,
      quantity,
      variantMaxQuantity: selectedVariant.quantity,
    };

    const result = await addToCart(data as any);

    if (result.success) {
      toast.success(result.message || "Added to cart");
      navigate(`/productDetails/${data.productId}`);
    } else {
      toast.error(result.message);
    }
  };

  // RENDER
  if (!currentProduct)
    return (
      <p className="text-center text-gray-500 py-10">
        Loading product details...
      </p>
    );

  return (
    <>
      <div className="w-full bg-gray-100 py-6 sm:py-10 lg:py-14 2xl:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
            
            {/* LEFT SECTION */}
            <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-2 py-3">
              
              {/* MAIN IMAGE */}
              <div className="w-full lg:w-[75%] rounded-2xl overflow-hidden">
                <img
                  src={mainImage}
                  alt="main product"
                  className="w-full h-[350px] sm:h-[400px] lg:h-[480px] rounded-2xl object-cover transition-all duration-300"
                />
              </div>

              {/* THUMBNAILS */}
              <div className="flex lg:flex-col justify-center items-center gap-3 mt-4 lg:mt-0 lg:w-[25%]">
                {images.map((img: string, index: number) => (
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
                      alt={`thumbnail ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {currentProduct?.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < (currentProduct?.ratings ?? 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Price */}
              <div className="text-3xl font-semibold text-gray-800">
                Rs {selectedVariant?.price?.toLocaleString() || "N/A"}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base">
                {currentProduct.description || "No description available."}
              </p>

              {/* COLOR OPTIONS */}
              <p className="font-semibold text-gray-800 mb-2">Select Color</p>
              <div className="flex flex-wrap gap-3">
                {colors.map((color: string, index: number) => {
                  const state = getColorButtonState(color);
                  return (
                    <button
                      key={index}
                      disabled={state.isDisabled}
                      onClick={() =>
                        state.canClick && handleColorSelect(color)
                      }
                      className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                        state.isSelected
                          ? "bg-black text-white border-black"
                          : state.isGrayedOut
                          ? "bg-gray-100 text-gray-400 border-gray-300"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-black hover:text-white hover:border-black cursor-pointer"
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>

              {/* STORAGE OPTIONS */}
              {storages.length > 0 && (
                <>
                  <p className="font-semibold text-gray-800 mb-2 mt-4">
                    Choose Specification
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {storages.map((storage: string, index: number) => {
                      const state = getStorageButtonState(storage);
                      return (
                        <button
                          key={index}
                          disabled={state.isDisabled}
                          onClick={() =>
                            state.canClick && handleStorageSelect(storage)
                          }
                          className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                            state.isSelected
                              ? "bg-black text-white border-black"
                              : state.isGrayedOut
                              ? "bg-gray-100 text-gray-400 border-gray-300"
                              : "bg-white text-gray-800 border-gray-300 hover:bg-black hover:text-white hover:border-black cursor-pointer"
                          }`}
                        >
                          {storage}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}


              {selectedVariant?.quantity === 0 && (
                <p className="text-red-500 text-sm font-medium mt-3">
                  This variant is currently out of stock
                </p>
              )}

              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center border rounded-full mb-3">
                  <button
                    className="px-4 py-2 text-xl font-semibold"
                    onClick={decrementHandler}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 text-xl">{quantity}</span>
                  <button
                    className="px-4 py-2 text-xl font-semibold"
                    onClick={incrementHandler}
                    disabled={
                      !selectedVariant ||
                      quantity >= selectedVariant.quantity
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="flex-1 bg-black text-white py-3 rounded-full mb-3 hover:bg-gray-800 transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={addToCartHandler}
                  disabled={!selectedVariant || selectedVariant.quantity === 0}
                >
                  {selectedVariant?.quantity === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DetailsSection;
