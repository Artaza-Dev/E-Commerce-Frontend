import HeroSection from "../../components/homeComponent/HeroSection";
import NewModelSection from "../../components/homeComponent/NewModelSection";
import MainLayout from "../../components/layout/MainLayout";
function Home() {

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
