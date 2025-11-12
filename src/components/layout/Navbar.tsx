import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Heart, ShoppingCart, CircleUserRound, Menu, X } from "lucide-react";
import userStore from "../../store/userStore";
import { toast } from "react-toastify";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logoutUser } = userStore();
  useEffect(() => {
    const fetchUser = async () => {
      await user;
      console.log("user in navbar", user);
    };
    fetchUser();
  }, [user]);

  const logoutHandler = async () => {
    try {
      const result = await logoutUser();
      if (result.success) {
        toast.success("Logout successful!");
      } else {
        toast.error(result.message || "Logout failed!");
      }
    } catch (err) {
      toast.error("Something went wrong during logout!");
    }
  };

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
              <Heart />
            </NavLink>

            <NavLink
              to="/cart"
              aria-label="Shopping Cart"
              className="p-2 hover:text-zinc-400 transition cursor-pointer"
            >
              <ShoppingCart />
            </NavLink>

            <button
              aria-label="User Account"
              className="p-2 hover:text-zinc-400 transition cursor-pointer"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              {userMenuOpen && user?.email ? <X /> : <CircleUserRound />}
            </button>

            {/* Mobile Menu Button */}
            <button
              aria-label="Open Menu"
              className="md:hidden p-2 hover:text-zinc-400 transition cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
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

        {/* User menu for all screen */}
        <div
          className={`absolute top-20 right-4 bg-white w-64 shadow-lg flex flex-col space-y-4 px-4 py-2 text-sm font-medium rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${
            userMenuOpen && user?.email
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full max-w-xs bg-linear-to-r from-gray-100 to-gray-50 shadow-lg rounded-2xl flex flex-col items-center justify-center p-6 space-y-3">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
              {user?.username?.[0]?.toUpperCase()}
            </div>

            {/* Username */}
            <p className="text-xl font-bold text-gray-800">{user?.username}</p>

            {/* Email */}
            <p className="text-sm font-medium text-gray-600 truncate w-full text-center">
              {user?.email}
            </p>

            {/* Logout Button */}
            <button
              className="group relative px-10 py-1.5 bg-black text-white text-md font-semibold rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
              onClick={logoutHandler}
            >
              {/* Shine effect */}
              <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

              <span className="relative flex items-center space-x-2">
                <span>Logout</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
