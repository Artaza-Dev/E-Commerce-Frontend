import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import visa from "../../assets/visaImage.png";
import paypal from "../../assets/paypalImage.png";
import mastercard from "../../assets/masterCard.png";
import googlepay from "../../assets/googlePay.png";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 text-gray-700 border-t border-gray-100">
      {/* --- Main Footer Grid --- */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* --- Brand Section --- */}
        <div>
          <h2 className="text-2xl font-extrabold mb-3 text-black">SHOP.CO</h2>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            We have clothes that suit your style and which you're proud to wear.
            From women to men.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="p-2 bg-black text-white rounded-full hover:bg-gray-700 transition">
              <FaTwitter size={14} />
            </a>
            <a href="#" className="p-2 bg-black text-white rounded-full hover:bg-gray-700 transition">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="p-2 bg-black text-white rounded-full hover:bg-gray-700 transition">
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

        {/* --- Company --- */}
        <div>
          <h3 className="font-bold mb-3 text-lg text-black">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black transition">About</a></li>
            <li><a href="#" className="hover:text-black transition">Features</a></li>
            <li><a href="#" className="hover:text-black transition">Works</a></li>
            <li><a href="#" className="hover:text-black transition">Career</a></li>
          </ul>
        </div>

        {/* --- Help --- */}
        <div>
          <h3 className="font-bold mb-3 text-lg text-black">Help</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black transition">Customer Support</a></li>
            <li><a href="#" className="hover:text-black transition">Delivery Details</a></li>
            <li><a href="#" className="hover:text-black transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-black transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* --- FAQ --- */}
        <div>
          <h3 className="font-bold mb-3 text-lg text-black">FAQ</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black transition">Account</a></li>
            <li><a href="#" className="hover:text-black transition">Manage Deliveries</a></li>
            <li><a href="#" className="hover:text-black transition">Orders</a></li>
            <li><a href="#" className="hover:text-black transition">Payments</a></li>
          </ul>
        </div>

        {/* --- Resources --- */}
        <div>
          <h3 className="font-bold mb-3 text-lg text-black">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black transition">Free eBooks</a></li>
            <li><a href="#" className="hover:text-black transition">Development Tutorial</a></li>
            <li><a href="#" className="hover:text-black transition">How to - Blog</a></li>
            <li><a href="#" className="hover:text-black transition">Youtube Playlist</a></li>
          </ul>
        </div>
      </div>

      {/* --- Bottom Bar (Fixed Layout) --- */}
      <div className="border-t border-gray-200 bg-white py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 text-sm text-gray-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Shop.co — All Rights Reserved
          </p>

          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <img src={visa} alt="Visa" className="h-5 w-auto object-contain" />
            <img src={mastercard} alt="Mastercard" className="h-5 w-auto object-contain" />
            <img src={paypal} alt="PayPal" className="h-5 w-auto object-contain" />
            <img src={googlepay} alt="Google Pay" className="h-5 w-auto object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
