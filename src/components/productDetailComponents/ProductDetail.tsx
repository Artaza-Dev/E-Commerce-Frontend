function ProductDetail() {
  const product = {
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    price: "$1,199",
    color: "Titanium Gray",
    rom: "512GB",
    display: "6.9-inch Super Retina XDR",
    camera: "48MP + 12MP + 12MP Triple Camera",
    battery: "4,500 mAh",
    processor: "A18 Bionic Chip",
    description:
      "Experience ultimate performance and elegance with the new iPhone 16 Pro Max, featuring a stunning display, powerful camera system, and premium titanium design.",
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* PRODUCT NAME */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
          {product.name}
        </h2>

        {/* BRAND & PRICE */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2 border-b border-gray-200 pb-4">
          <p className="text-gray-700 text-lg font-medium">
            Brand: <span className="font-semibold">{product.brand}</span>
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-blue-600">
            {product.price}
          </p>
        </div>

        {/* PRODUCT DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-gray-700 mt-4">
          <p>
            <span className="font-semibold text-gray-800">Color:</span> {product.color}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Storage (ROM):</span> {product.rom}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Display:</span> {product.display}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Camera:</span> {product.camera}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Battery:</span> {product.battery}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Processor:</span> {product.processor}
          </p>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-100">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
