import type { Product } from "../../store/productStore";

interface IProps {
  detail: Product | null;
}

function ProductDetail({ detail }: IProps) {
  if (!detail) {
    return <p className="text-center text-gray-500">No product details found.</p>;
  }

  const excludedKeys = ["name", "brand", "price", "description", "id", "image"];
  const dynamicAttributes = Object.entries(detail).filter(
    ([key]) => !excludedKeys.includes(key)
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* PRODUCT NAME */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
          {detail.name}
        </h2>

        {/* BRAND & PRICE */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2 border-b border-gray-200 pb-4">
          <p className="text-gray-700 text-lg font-medium">
            Brand: <span className="font-semibold">{detail.brand}</span>
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-blue-600">
            Rs {detail.price}
          </p>
        </div>

        {/* DYNAMIC PRODUCT DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-gray-700 mt-4">
          {dynamicAttributes.map(([key, value]) => (
            <p key={key}>
              <span className="font-semibold text-gray-800">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </span>{" "}
              {value || "N/A"}
            </p>
          ))}
        </div>

        {/* DESCRIPTION SECTION */}
        {detail.description && (
          <div className="mt-6 bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-100">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {detail.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
