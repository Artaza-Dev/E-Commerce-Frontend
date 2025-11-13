import "./App.css";
import { useEffect } from "react";
import Routing from "./routing/Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productStore from "./store/productStore";
function App() {
  const { fetchWishListItems } = productStore();
  useEffect(() => {
    fetchWishListItems();
  }, []);
  useEffect(() => {
    productStore.getState().fetchCartItems({} as any);
  }, []);
  return (
    <>
      <Routing />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
