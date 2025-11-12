import React, { useEffect } from "react";
import { MapPin, Phone } from "lucide-react";
import addressStore from "../../store/addressStore";

interface AddressCardProps {
  setAddress: (address: any) => void;
  selectedAddressId: string;
}

const AddressCard: React.FC<AddressCardProps> = ({
  setAddress,
  selectedAddressId,
}) => {
  const { addresses, fetchaddress } = addressStore();

  useEffect(() => {
    const fetchData = () => {
      fetchaddress();
    };
    fetchData();
  }, [fetchaddress]);
  return (
    <>
      {addresses?.length > 0 ? (
        addresses?.map((val, index) => {
          const isSelected = val._id === selectedAddressId;
          return (
            <div
              className={`bg-white border rounded-2xl p-6 shadow-md transition-all duration-300 max-w-md w-full
        ${
          isSelected
            ? "border-black shadow-lg"
            : "border-gray-300 hover:shadow-lg"
        }`}
              key={index}
            >
              {/* Header */}

              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {val?.fullName}
                </h3>
                {isSelected ? (
                  <span className="bg-black text-white text-xs font-medium px-2.5 py-1 rounded">
                    Used
                  </span>
                ) : (
                  <> </>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-3 shrink-0" />
                  <span className="text-sm">{val?.phone}</span>
                </div>

                <div className="flex items-start text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p>{val?.address}</p>
                    <p>
                      {val?.city}, {val?.state} {val?.zip}
                    </p>
                    <p>{val?.country}</p>
                  </div>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => setAddress(val)}
                className={`w-full font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 cursor-pointer
          ${
            isSelected
              ? "bg-gray-400 text-white"
              : "bg-black text-white hover:bg-gray-800"
          }`}
              >
                {isSelected ? "Selected" : "Use This Address"}
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-600 mt-10">
          No address added yet...
        </p>
      )}
    </>
  );
};

export default AddressCard;
