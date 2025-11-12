import React, { useState } from "react";
import addressStore from "../../store/addressStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface UserAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const AddAddress: React.FC = () => {
  const { createAddress } = addressStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserAddress>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const addressSchema = Yup.object().shape({
    fullName: Yup.string()
      .trim()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),

    phone: Yup.string()
      .required("Phone number is required"),

    address: Yup.string()
      .min(5, "Address must be at least 5 characters")
      .required("Address is required"),

    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),

    zip: Yup.string()
      .required("ZIP code is required"),

    country: Yup.string().required("Country is required"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addressSchema.validate(formData, { abortEarly: false });
      let result = await createAddress(formData as any);

      if (result.success) {
        toast.success("Address saved successfully!");
        setFormData({
          fullName: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        });
        setTimeout(() => navigate("/checkout"), 1000);
      } else {
        toast.error(result.message || "Failed to save address!");
      }
    } catch (err: any) {
      if (err.inner && err.inner.length > 0) {
        err.inner.forEach((error: any) => {
          toast.error(error.message);
        });
      } else {
        toast.error(err.message || "Validation failed");
      }
    }
  };

  return (
    <>
      <div className="w-full bg-gray-50 rounded-xl shadow-inner px-5 sm:px-8 py-6 transition-all duration-500 flex flex-col items-center gap-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full md:w-[80%] rounded-2xl shadow-md p-6 sm:p-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Shipping Address
          </h2>

          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+92 300 1234567"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Street Address
            </label>
            <textarea
              name="address"
              placeholder="House #, Street name"
              value={formData.address}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                State/Province
              </label>
              <input
                type="text"
                name="state"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Zip & Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                name="zip"
                placeholder="Postal code"
                value={formData.zip}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                placeholder="Enter country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-all duration-300 cursor-pointer"
          >
            Save Address
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAddress;
