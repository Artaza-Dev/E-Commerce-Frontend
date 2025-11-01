import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const AddressCard: React.FC = () => {
  const fullName = "Hafiz Artaza";
  const phone = "+92 345 6789012";
  const email = "hafizartaza@example.com";
  const address = "House No. 24, Street 8, G-10/2";
  const city = "Islamabad";
  const state = "ICT";
  const zip = "44000";
  const country = "Pakistan";
  const isDefault = true;

  // 🔹 Dummy button handler
  const onUseAddress = () => {
    alert("This address has been selected");
  };

  return (
   <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 max-w-md w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{fullName}</h3>
        {isDefault && (
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">
            Default
          </span>
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-3 shrink-0" />
          <span className="text-sm">{phone}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-3 shrink-0" />
          <span className="text-sm break-all">{email}</span>
        </div>

        <div className="flex items-start text-gray-600">
          <MapPin className="w-4 h-4 mr-3 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p>{address}</p>
            <p>
              {city}, {state} {zip}
            </p>
            <p>{country}</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onUseAddress}
        className="w-full bg-black text-white font-medium py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
      >
        Use This Address
      </button>
    </div>
  );
};

export default AddressCard;
