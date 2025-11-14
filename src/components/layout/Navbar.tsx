import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, CircleUserRound, Menu, X } from "lucide-react";
import userStore from "../../store/userStore";
import { toast } from "react-toastify";
import productStore from "../../store/productStore";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logoutUser, fetchCurrentUser } = userStore();
  const { wishListProducts, cartItems } = productStore();
  useEffect(() => {
    const initializeUser = async () => {
      await fetchCurrentUser();
    };
    initializeUser();
  }, []);

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

            <div className="text-xl sm:text-2xl font-black tracking-tighter text-black cursor-pointer">
              <NavLink to="/">SHOP.CO</NavLink>
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
              <NavLink
                to="/coupon"
                className="text-black hover:text-zinc-400 transition"
              >
                Coupons
              </NavLink>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-lg sm:text-xl">
            {user?.email ? (
              <>
                <NavLink
                  to="/wishlist"
                  aria-label="Wishlist"
                  className="relative group p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
                >
                  <Heart className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" />
                  {wishListProducts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-linear-to-br from-red-500 to-pink-600 text-white text-[10px] font-semibold min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 ">
                      {wishListProducts.length > 99
                        ? "99+"
                        : wishListProducts.length}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/cart"
                  aria-label="Shopping Cart"
                  className="relative group p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
                >
                  <ShoppingCart className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-linear-to-br from-blue-500 to-indigo-600 text-white text-[10px] font-semibold min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
                      {cartItems.length > 99 ? "99+" : cartItems.length}
                    </span>
                  )}
                </NavLink>

                <button
                  aria-label="User Account"
                  className="p-2 hover:text-zinc-400 transition cursor-pointer"
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                  }}
                >
                  {userMenuOpen ? <X /> : <CircleUserRound />}
                </button>
              </>
            ) : (
              <>
                <button
                  className="hidden md:block group relative px-5 md:px-8 py-2 bg-black text-white text-lg font-bold rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

                  <span className="relative flex items-center space-x-2">
                    <span>Get Started</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>
              </>
            )}

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
            menuOpen ? "max-h-72 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
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
            to="/coupon"
            onClick={() => setMenuOpen(false)}
            className="text-black hover:text-zinc-400 transition"
          >
            Coupons
          </NavLink>
          
          {!user?.email && (
            <>
              <button className="md:hidden group relative w-44 px-5 md:px-8 py-2 bg-black text-white text-lg font-bold rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer">
                <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

                <span className="relative flex items-center space-x-2">
                  <span>Get Started</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </>
          )}
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
