import HeroSection from "../../components/homeComponent/HeroSection";
import NewModelSection from "../../components/homeComponent/NewModelSection";
// import TopSellingSection from "../../components/homeComponent/TopSellingSection";'
import MainLayout from "../../components/layout/MainLayout";
function Home() {
  return (
    <>
      <div className="w-full min-h-screen">
        <MainLayout>
        <HeroSection />
        <NewModelSection />
        {/* <div className="w-full flex items-center justify-center">
          <hr className="border-zinc-200 w-[70%] " />
        </div>
        <TopSellingSection /> */}
        </MainLayout>
      </div>
    </>
  );
}

export default Home;
