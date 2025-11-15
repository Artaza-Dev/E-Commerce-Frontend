import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import productStore from "../../store/productStore";
import { toast } from "react-toastify";

function FilterSection() {
  const { fetchProductByCategory, selectedCategory, setSelectedCategory } =
    productStore();

  const [isOpen, setIsOpen] = useState(false);

  const categoryHandler = async (category: string) => {
    setSelectedCategory(category);

    const res = await fetchProductByCategory(category);
    if (!res.success) toast.error(res.message);

    setIsOpen(false);
  };

  return (
    <>
      {/* MOBILE FILTER BUTTON */}
      <div>
  {/* Mobile Filter Button */}
  <div className="lg:hidden flex items-center justify-between p-4 bg-white rounded-xl shadow-md mb-4">
    <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
    <button
      onClick={() => setIsOpen(true)}
      className="p-2 border rounded-lg hover:bg-gray-100 transition"
    >
      <SlidersHorizontal size={22} />
    </button>
  </div>

  {/* Sidebar (Mobile Drawer + Desktop Static) */}
  <div
    className={`fixed lg:static top-0 left-0 z-50 lg:z-auto
      h-full lg:h-auto w-3/4 sm:w-2/3 md:w-1/2 lg:w-full
      bg-white border-r border-gray-200 shadow-xl lg:shadow-none
      p-5 overflow-y-auto rounded-r-2xl hide-scrollbar
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
  >
    {/* Close Button (Mobile) */}
    <div className="flex justify-between items-center mb-4 lg:hidden">
      <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
      <button
        onClick={() => setIsOpen(false)}
        className="p-2 border rounded-lg hover:bg-gray-100"
      >
        <X size={22} />
      </button>
    </div>

    {/* Sticky filter for desktop */}
    <div className="lg:sticky lg:top-28">

      {/* CATEGORIES */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>

        <div className="flex flex-col space-y-2">
          {[
            "AllProducts",
            "Smartphone",
            "Laptop",
            "Tablet",
            "Smartwatch",
            "Headphone",
          ].map((val, index) => {
            const active = selectedCategory === val;
            return (
              <button
                key={index}
                className={`w-full py-2 rounded-xl text-left px-4
                  border transition-all cursor-pointer
                  ${
                    active
                      ? "bg-black text-white border-black"
                      : "bg-gray-50 hover:bg-gray-200 text-gray-700 border-gray-300"
                  }`}
                onClick={() => categoryHandler(val)}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  </div>

  {/* Mobile Overlay */}
  {isOpen && (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
    />
  )}
</div>

    </>
  );
}

export default FilterSection;
