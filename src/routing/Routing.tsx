import { BrowserRouter,Routes, Route  } from "react-router-dom"
import Home from "../pages/home/Home"
import ProductDetails from "../pages/productDetails/ProductDetails"
import Cart from "../pages/cart/Cart"
import WishList from "../pages/wishList/WishList"
import Categories from "../pages/categories/Categories"
import Orders from "../pages/orders/Orders"
function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/productdetails" element={<ProductDetails/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/wishlist" element={<WishList/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/orders" element={<Orders/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Routing