import { useEffect, useState, useMemo } from "react";
import productStore from "../../store/productStore";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
function DetailsSection() {
  const navigate = useNavigate();
  const { currentProduct, addToCart } = productStore();
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // Memoize images array
  const images = useMemo(() => {
    return currentProduct?.images?.filter(Boolean) || [];
  }, [currentProduct]);

  // Memoize available options
  const availableOptions = useMemo(() => {
    if (!currentProduct?.variants) return { colors: [], storages: [] };

    const colors = [...new Set(currentProduct.variants.map((v) => v.color))];
    const storages = [...new Set(currentProduct.variants.map((v) => v.storage))];

    return { colors, storages };
  }, [currentProduct]);

  // Memoize variant lookup
  const selectedVariant = useMemo(() => {
    if (!currentProduct?.variants || !selectedColor || !selectedStorage) {
      return null;
    }
    return currentProduct.variants.find(
      (v) => v.color === selectedColor && v.storage === selectedStorage
    ) || null;
  }, [currentProduct, selectedColor, selectedStorage]);

  // Get valid storages for selected color
  const validStoragesForColor = useMemo(() => {
    if (!currentProduct?.variants || !selectedColor) return [];
    return [
      ...new Set(
        currentProduct.variants
          .filter((v) => v.color === selectedColor)
          .map((v) => v.storage)
      ),
    ];
  }, [currentProduct, selectedColor]);

  // Get valid colors for selected storage
  const validColorsForStorage = useMemo(() => {
    if (!currentProduct?.variants || !selectedStorage) return [];
    return [
      ...new Set(
        currentProduct.variants
          .filter((v) => v.storage === selectedStorage)
          .map((v) => v.color)
      ),
    ];
  }, [currentProduct, selectedStorage]);

  // Check if a color has any available stock
  const isColorAvailable = (color: string) => {
    return currentProduct?.variants.some(
      (v) => v.color === color && v.quantity > 0
    );
  };

  // Check if a storage has any available stock
  const isStorageAvailable = (storage: string) => {
    return currentProduct?.variants.some(
      (v) => v.storage === storage && v.quantity > 0
    );
  };

  // Check if a specific combination exists
  const isCombinationValid = (color: string, storage: string) => {
    return currentProduct?.variants.some(
      (v) => v.color === color && v.storage === storage
    );
  };

  // Initialize variant on product load
  useEffect(() => {
    if (!currentProduct?.variants?.length) return;
    const firstAvailable = currentProduct.variants.find((v) => v.quantity > 0);
    
    if (firstAvailable) {
      setSelectedColor(firstAvailable.color);
      setSelectedStorage(firstAvailable.storage);
    } else {
      const firstVariant = currentProduct.variants[0];
      setSelectedColor(firstVariant.color);
      setSelectedStorage(firstVariant.storage);
    }
    
    setQuantity(1);
  }, [currentProduct]);

  // Set main image when images change
  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  const handleColorSelect = (color: string) => {
    if (!isColorAvailable(color)) return;

    setSelectedColor(color);
    setQuantity(1);
    const existingCombo = currentProduct?.variants.find(
      (v) => v.color === color && v.storage === selectedStorage
    );
    if (existingCombo && existingCombo.quantity > 0) {
      return;
    }
    const availableVariant = currentProduct?.variants.find(
      (v) => v.color === color && v.quantity > 0
    );

    if (availableVariant) {
      setSelectedStorage(availableVariant.storage);
    } else {
      const anyVariant = currentProduct?.variants.find((v) => v.color === color);
      if (anyVariant) {
        setSelectedStorage(anyVariant.storage);
      }
    }
  };

  const handleStorageSelect = (storage: string) => {
    if (!isStorageAvailable(storage)) return;

    setSelectedStorage(storage);
    setQuantity(1);

    const existingCombo = currentProduct?.variants.find(
      (v) => v.color === selectedColor && v.storage === storage
    );

    if (existingCombo && existingCombo.quantity > 0) {
      return;
    }

    const availableVariant = currentProduct?.variants.find(
      (v) => v.storage === storage && v.quantity > 0
    );

    if (availableVariant) {
      setSelectedColor(availableVariant.color);
    } else {
      const anyVariant = currentProduct?.variants.find((v) => v.storage === storage);
      if (anyVariant) {
        setSelectedColor(anyVariant.color);
      }
    }
  };

  const handleThumbnailClick = (img: string) => {
    setMainImage(img);
  };

  const incrementHandler = () => {
    if (selectedVariant && quantity < selectedVariant.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementHandler = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const addToCartHandler = async () => {
    if (!currentProduct?._id || !selectedVariant?._id) {
      toast.error("Please select a valid product variant.");
      return;
    }
    if (selectedVariant.quantity === 0) {
      toast.error("This variant is out of stock.");
      return;
    }

    const data = {
      variantId: selectedVariant._id,
      productId: currentProduct._id,
      quantity,
      variantMaxQuantity: selectedVariant.quantity,
    };
    
    try {
      const result = await addToCart(data as any);
      if (result.success) {
        toast.success(result.message || "Product added to cart successfully");
        navigate(`/productDetails/${data.productId}`);
      } else {
        toast.error(result.message || "Something went wrong while adding to cart");
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  const getColorButtonState = (color: string) => {
    const isSelected = selectedColor === color;
    const hasStock = isColorAvailable(color);
    const isComboValid = selectedStorage ? isCombinationValid(color, selectedStorage) : true;
    const isComboAvailable = selectedStorage ? validColorsForStorage.includes(color) : true;
    return {
      isSelected,
      isDisabled: !hasStock,
      isGrayedOut: !hasStock || (selectedStorage && !isComboAvailable),
      canClick: hasStock,
    };
  };

  const getStorageButtonState = (storage: string) => {
    const isSelected = selectedStorage === storage;
    const hasStock = isStorageAvailable(storage);
    const isComboValid = selectedColor ? isCombinationValid(selectedColor, storage) : true;
    const isComboAvailable = selectedColor ? validStoragesForColor.includes(storage) : true;

    return {
      isSelected,
      isDisabled: !hasStock,
      isGrayedOut: !hasStock || (selectedColor && !isComboAvailable),
      canClick: hasStock,
    };
  };

  if (!currentProduct) {
    return (
      <p className="text-center text-gray-500 py-10">
        Loading product details...
      </p>
    );
  }

  return (
    <>
      <div className="w-full bg-gray-100 py-6 sm:py-10 lg:py-14 2xl:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 bg-white rounded-2xl shadow-lg">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
          {/* LEFT SECTION - PRODUCT IMAGES */}
          <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-2 py-3">
            {/* MAIN IMAGE */}
            <div className="w-full lg:w-[75%] rounded-2xl overflow-hidden border-gray-200">
              <img
                src={mainImage}
                alt="main product"
                className="w-full h-[350px] sm:h-[400px] lg:h-[480px] rounded-2xl object-cover transition-all duration-300"
              />
            </div>

            {/* THUMBNAIL IMAGES */}
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
                    alt={`thumbnail ${index + 1}`}
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
              Rs {selectedVariant?.price.toLocaleString() || "N/A"}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base">
              {currentProduct.description || "No description available."}
            </p>

            <div>
              {/* Select Color */}
              <p className="font-semibold text-gray-800 mb-2">Select Color</p>
              <div className="flex flex-wrap gap-3">
                {availableOptions.colors.map((color, index) => {
                  const state = getColorButtonState(color);
                  return (
                    <button
                      key={index}
                      disabled={state.isDisabled}
                      onClick={() => state.canClick && handleColorSelect(color)}
                      className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                        state.isSelected
                          ? "bg-black text-white border-black"
                          : state.isGrayedOut
                          ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-black hover:text-white hover:border-black cursor-pointer"
                      }`}
                      title={
                        state.isDisabled
                          ? "Out of stock"
                          : state.isGrayedOut && !state.isDisabled
                          ? "Not available with selected storage"
                          : ""
                      }
                    >
                      {color}
                    </button>
                  );
                })}
              </div>

              {/* Choose Specification */}
              <p className="font-semibold text-gray-800 mb-2 mt-4">
                Choose Specification
              </p>
              <div className="flex flex-wrap gap-3">
                {availableOptions.storages.map((storage, index) => {
                  const state = getStorageButtonState(storage);
                  return (
                    <button
                      key={index}
                      disabled={state.isDisabled}
                      onClick={() => state.canClick && handleStorageSelect(storage)}
                      className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                        state.isSelected
                          ? "bg-black text-white border-black"
                          : state.isGrayedOut
                          ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-black hover:text-white hover:border-black cursor-pointer"
                      }`}
                      title={
                        state.isDisabled
                          ? "Out of stock"
                          : state.isGrayedOut && !state.isDisabled
                          ? "Not available with selected color"
                          : ""
                      }
                    >
                      {storage}
                    </button>
                  );
                })}
              </div>

              {/* Out of Stock Warning */}
              {selectedVariant?.quantity === 0 && (
                <p className="text-red-500 text-sm font-medium mt-3">
                   This variant is currently out of stock
                </p>
              )}

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center border rounded-full mb-3">
                  <button
                    className="px-4 py-2 text-xl font-semibold cursor-pointer hover:text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={decrementHandler}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 text-xl">{quantity}</span>
                  <button
                    className="px-4 py-2 text-xl font-semibold cursor-pointer hover:text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={incrementHandler}
                    disabled={
                      !selectedVariant || quantity >= selectedVariant.quantity
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
                  {selectedVariant?.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
    
  );
}

export default DetailsSection;