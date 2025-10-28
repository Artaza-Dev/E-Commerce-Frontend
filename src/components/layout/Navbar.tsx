import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faBars,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  return (
    <>
      <div className="w-full bg-white shadow-md">
        <nav className="max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* LEFT SECTION */}
          <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
            {/* Logo */}
            <div className="text-xl sm:text-2xl font-black tracking-tighter text-black">
              SHOP.CO
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium">
              <a href="#" className="text-black hover:text-zinc-400 transition">
                Home
              </a>
              <a href="#" className="text-black hover:text-zinc-400 transition">
                Shop
              </a>
              <a href="#" className="text-black hover:text-zinc-400 transition">
                Orders
              </a>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-lg sm:text-xl">
            <button
              aria-label="Wishlist"
              className="p-2 hover:text-zinc-400 transition cursor-pointer"
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>

            <button
              aria-label="Shopping Cart"
              className="p-2 hover:text-zinc-400 transition cursor-pointer"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>

            <button
              aria-label="User Account"
              className="p-2 hover:text-zinc-400 transition cursor-pointer"
            >
              <FontAwesomeIcon icon={faUser} />
            </button>

            {/* Mobile Menu Button */}
            <button
              aria-label="Open Menu"
              className="md:hidden p-2 hover:text-zinc-400 transition cursor-pointer"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
