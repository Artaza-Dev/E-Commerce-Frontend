import { BrowserRouter,Routes, Route  } from "react-router-dom"
import Home from "../pages/home/Home"
import ProductDetails from "../pages/productDetails/ProductDetails"
import Cart from "../pages/cart/Cart"
import WishList from "../pages/wishList/WishList"
import Categories from "../pages/categories/Categories"
import Orders from "../pages/orders/Orders"
import Signup from "../pages/signup/Signup"
import Login from "../pages/login/Login"
// import ForgotPassword from "../pages/forgotPassword/ForgotPassword"
// import VerifyOtp from "../pages/verifyOtp/VerifyOtp"
// import ResetPassword from "../pages/resetPassword/ResetPassword"
import Checkout from "../pages/checkout/Checkout"
function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/productdetails/:productId" element={<ProductDetails/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/wishlist" element={<WishList/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            {/* <Route path="/forgotpassword" element={<ForgotPassword/>}/>
            <Route path="/verifyotp" element={<VerifyOtp/>}/>
            <Route path="/resetpassword" element={<ResetPassword/>}/> */}
        </Routes>
    </BrowserRouter>
  )
}

export default Routing