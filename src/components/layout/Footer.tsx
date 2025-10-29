import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import visa from "../../assets/visaImage.png";
import paypal from "../../assets/paypalImage.png";
import mastercard from "../../assets/masterCard.png";
import googlepay from "../../assets/googlePay.png";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 text-">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* --- Brand Section --- */}
        <div>
          <h2 className="text-2xl font-extrabold mb-3">SHOP.CO</h2>
          <p className="text-gray-600 text-sm mb-4">
            We have clothes that suit your style and which you're proud to wear.
            From women to men.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="p-2 bg-black text-white rounded-full hover:bg-gray-700">
              <FaTwitter size={14} />
            </a>
            <a href="#" className="p-2 bg-black text-white rounded-full hover:bg-gray-700">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="p-2 bg-black text-white rounded-full hover:bg-gray-700">
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

        {/* --- Company --- */}
        <div>
          <h3 className="font-bold mb-3 text-lg">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black">About</a></li>
            <li><a href="#" className="hover:text-black">Features</a></li>
            <li><a href="#" className="hover:text-black">Works</a></li>
            <li><a href="#" className="hover:text-black">Career</a></li>
          </ul>
        </div>

        {/* --- Help --- */}
        <div>
          <h3 className="font-bold mb-3 text-lg">Help</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black">Customer Support</a></li>
            <li><a href="#" className="hover:text-black">Delivery Details</a></li>
            <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
          </ul>
        </div>

        {/* --- FAQ --- */}
        <div>
          <h3 className="font-bold mb-3 text-lg">FAQ</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black">Account</a></li>
            <li><a href="#" className="hover:text-black">Manage Deliveries</a></li>
            <li><a href="#" className="hover:text-black">Orders</a></li>
            <li><a href="#" className="hover:text-black">Payments</a></li>
          </ul>
        </div>

        {/* --- Resources --- */}
        <div>
          <h3 className="font-bold mb-3 text-lg">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black">Free eBooks</a></li>
            <li><a href="#" className="hover:text-black">Development Tutorial</a></li>
            <li><a href="#" className="hover:text-black">How to - Blog</a></li>
            <li><a href="#" className="hover:text-black">Youtube Playlist</a></li>
          </ul>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="border-t border-gray-200 mt-6 py-4 px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>Shop.co © 2000-2025. All Rights Reserved</p>
        <div className="flex items-center gap-4 mt-3 md:mr-10 md:mt-0">
          <img src={visa} alt="Visa" className="h-4" />
          <img src={mastercard} alt="Mastercard" className="h-4" />
          <img src={paypal} alt="PayPal" className="h-4" />
          <img src={googlepay} alt="Google Pay" className="h-4" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
