import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";

function FilterSection() {
  const [isOpen, setIsOpen] = useState(false);

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
        {/* Close button (Mobile only) */}
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
          <h3 className="font-semibold text-gray-700 mb-2">Operating System</h3>
          <div className="flex flex-col space-y-2 text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 cursor-pointer" />{" "}
              Android
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 cursor-pointer" /> iOS
            </label>
          </div>
        </div>

        {/* Mobile Company */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Mobile Company</h3>
          <div className="flex flex-col space-y-2 text-gray-600">
            {["Samsung", "iPhone", "Infinix", "Vivo", "Oppo"].map(
              (brand, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer" />{" "}
                  {brand}
                </label>
              )
            )}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">
            Price Range (PKR)
          </h3>
          <input
            type="range"
            min="10000"
            max="300000"
            className="w-full accent-green-500 cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>10,000</span>
            <span>300,000</span>
          </div>
        </div>

        {/* RAM */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">RAM</h3>
          <div className="flex flex-col space-y-2 text-gray-600">
            {["4GB", "6GB", "8GB", "12GB"].map((ram, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input type="checkbox" className="w-4 h-4" /> {ram}
              </label>
            ))}
          </div>
        </div>

        {/* ROM */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Storage (ROM)</h3>
          <div className="flex flex-col space-y-2 text-gray-600">
            {["64GB", "128GB", "256GB", "512GB"].map((rom, index) => (
              <label key={index} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 cursor-pointer" />{" "}
                {rom}
              </label>
            ))}
          </div>
        </div>

        {/* Apply / Clear Buttons */}
        <div className="flex justify-between gap-3 mt-8">
          <button className="w-1/2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition">
            Apply
          </button>
          <button className="w-1/2 border border-gray-400 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            Clear
          </button>
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
