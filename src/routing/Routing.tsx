import { BrowserRouter,Routes, Route  } from "react-router-dom"
import Home from "../pages/home/Home"
import ProductDetails from "../pages/productDetails/ProductDetails"
import Cart from "../pages/cart/Cart"
import WishList from "../pages/wishList/WishList"
import Categories from "../pages/categories/Categories"
import Orders from "../pages/orders/Orders"
import Signup from "../pages/signup/Signup"
import Login from "../pages/login/Login"
import PublicRoute from "./PublicRoute"
import PrivateRoute from "./PrivateRoute"
import Checkout from "../pages/checkout/Checkout"
function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PublicRoute><Home/></PublicRoute>}/>
            <Route path="/productdetails/:productId" element={<PublicRoute><ProductDetails/></PublicRoute>}/>
            <Route path="/categories" element={<PublicRoute><Categories/></PublicRoute>}/>

            <Route path="/signup" element={<PublicRoute restricted><Signup /></PublicRoute>}/>
            <Route path="/login" element={<PublicRoute restricted><Login /></PublicRoute>}/>

            <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>}/>
            <Route path="/wishlist" element={<PrivateRoute><WishList/></PrivateRoute>}/>
            <Route path="/orders" element={<PrivateRoute><Orders/></PrivateRoute>}/>
            <Route path="/checkout" element={<PrivateRoute><Checkout/></PrivateRoute>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Routing