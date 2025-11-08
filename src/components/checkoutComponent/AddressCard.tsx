import React, { useEffect } from "react";
import { MapPin, Phone } from "lucide-react";
import addressStore from "../../store/addressStore";
const AddressCard: React.FC = () => {
  const { addresses, fetchaddress } = addressStore();

  useEffect(() => {
    const fetchData = () => {
      fetchaddress();
    };
    fetchData();
  }, [fetchaddress]);
  console.log("data in addresses card compo", addresses);

  // Dummy button handler
  const onUseAddress = () => {
    alert("This address has been selected");
  };

  return (
    <>
      {addresses?.length > 0 ? (
        addresses?.map((val, index) => {
          return (
            <div
              className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 max-w-md w-full"
              key={index}
            >
              {/* Header */}

              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {val?.fullName}
                </h3>
                {val?.isDefault && (
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">
                   Default
                  </span>
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
                onClick={onUseAddress}
                className="w-full bg-black text-white font-medium py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
              >
                Use This Address
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-600 mt-10">No address added yet...</p>
      )}
    </>
  );
};

export default AddressCard;
