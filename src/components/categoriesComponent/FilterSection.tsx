import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import productStore from "../../store/productStore";
function FilterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const {product} = productStore();
  return (
    <>
      {/* Mobile Filter Button (Fixed at top of results) */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-4 ">
        <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 border rounded-md hover:bg-gray-100"
        >
          <SlidersHorizontal size={22} />
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile both) */}
      <div
        className={`fixed lg:static top-0 left-0 z-50 lg:z-auto
  h-full sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[750px] 2xl:h-[800px]
  w-3/4 sm:w-2/3 md:w-1/2 lg:w-[25%]
  bg-white border-r border-gray-200 shadow-lg lg:shadow-none p-5
  overflow-y-auto rounded-r-xl
  transform transition-transform duration-300 ease-in-out hide-scrollbar
  ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Close button (for Mobile only) */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 border rounded-md hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* OS Filter */}
          <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Categories</h3>
        <div className="flex flex-col space-y-2 text-gray-600">
          {product.map(
            (val, index) => (
              <div key={index} className="w-full h-10 border-zinc-500 rounded-xl hover:bg-gray-100 flex items-center pl-2 cursor-pointer">
                <p className="">{val.category}</p>
              </div>
            )
          )}
        </div>
      </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
        ></div>
      )}
    </>
  );
}

export default FilterSection;
