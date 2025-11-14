import type { ReactNode } from "react"
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect } from "react";
import productStore from "../../store/productStore";
interface MainLayoutProps {
  children: ReactNode;
}
function MainLayout({ children }: MainLayoutProps) {
   const { fetchWishListItems, fetchCartItems } = productStore();

  useEffect(() => {
    fetchWishListItems();
    fetchCartItems()
    console.log("use effect is running...");
    
  }, []);

  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default MainLayout;
