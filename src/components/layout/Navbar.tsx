import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faShoppingCart,
  faUser,
  faBars,
  faHeart,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* LEFT SECTION */}
          <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
            {/* Logo */}
            <div className="text-xl sm:text-2xl font-black tracking-tighter text-black">
              SHOP.CO
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium">
              <NavLink
                to="/"
                className="text-black hover:text-zinc-400 transition"
              >
                Home
              </NavLink>
              <NavLink
                to="/categories"
                className="text-black hover:text-zinc-400 transition"
              >
                Categories
              </NavLink>
              <NavLink
                to="/orders"
                className="text-black hover:text-zinc-400 transition"
              >
                Orders
              </NavLink>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-lg sm:text-xl">
            <NavLink
              to="/wishlist"
              aria-label="Wishlist"
              className="p-2 hover:text-zinc-400 transition cursor-pointer"
            >
              <FontAwesomeIcon icon={faHeart} />
            </NavLink>

            <NavLink
              to="/cart"
              aria-label="Shopping Cart"
              className="p-2 hover:text-zinc-400 transition cursor-pointer"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </NavLink>

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
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden bg-white shadow-inner flex flex-col space-y-4 px-6 text-sm font-medium overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen ? "max-h-60 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
          }`}
        >
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-black hover:text-zinc-400 transition"
          >
            Home
          </NavLink>
          <NavLink
            to="/categories"
            onClick={() => setMenuOpen(false)}
            className="text-black hover:text-zinc-400 transition"
          >
            Categories
          </NavLink>
          <NavLink
            to="/orders"
            onClick={() => setMenuOpen(false)}
            className="text-black hover:text-zinc-400 transition"
          >
            Orders
          </NavLink>
          <NavLink
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="text-black hover:text-zinc-400 transition"
          >
            Wishlist
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-black hover:text-zinc-400 transition"
          >
            Cart
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar;
