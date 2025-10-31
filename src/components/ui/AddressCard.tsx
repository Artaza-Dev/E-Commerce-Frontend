import React from "react";
import { MapPin, Phone, Mail, Trash2, Home, Briefcase, Heart } from "lucide-react";

export interface Address {
  id: number;
  type: string;
  icon: "home" | "work" | "other";
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  isDefault: boolean;
}

interface AddressCardProps {
  address: Address;
  onDelete: (id: number) => void;
  onSetDefault: (id: number) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, onDelete, onSetDefault }) => {
  const getIcon = (iconType: "home" | "work" | "other") => {
    switch (iconType) {
      case "home":
        return <Home className="w-5 h-5" />;
      case "work":
        return <Briefcase className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 relative">
      {address.isDefault && (
        <div className="absolute top-4 right-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
          DEFAULT
        </div>
      )}

      <div className="p-6">
        {/* Address Type */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black">
            {getIcon(address.icon)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">{address.type}</h3>
            <p className="text-sm text-gray-500">Address</p>
          </div>
        </div>

        {/* Name */}
        <h4 className="font-semibold text-black text-lg mb-3">{address.name}</h4>

        {/* Contact Info */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>{address.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span>{address.email}</span>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-1" />
            <div>
              <p>{address.street}</p>
              <p>{address.city}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 space-y-2">
          {!address.isDefault ? (
            <button
              onClick={() => onSetDefault(address.id)}
              className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800"
            >
              Set as Default
            </button>
          ) : (
            <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800">
              Use This Address
            </button>
          )}

          <button
            onClick={() => onDelete(address.id)}
            className="w-full bg-gray-100 text-red-600 py-2 rounded-lg font-medium hover:bg-red-50"
          >
            <Trash2 className="inline w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
