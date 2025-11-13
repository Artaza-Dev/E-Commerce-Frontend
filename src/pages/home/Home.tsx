import { useEffect } from "react";
import HeroSection from "../../components/homeComponent/HeroSection";
import NewModelSection from "../../components/homeComponent/NewModelSection";
import MainLayout from "../../components/layout/MainLayout";
import productStore from "../../store/productStore";
function Home() {
  const { fetchWishListItems } = productStore();
  useEffect(() => {
    fetchWishListItems();
  }, []);
  return (
    <>
      <div className="w-full min-h-screen">
        <MainLayout>
          <HeroSection />
          <NewModelSection />
        </MainLayout>
      </div>
    </>
  );
}

export default Home;
