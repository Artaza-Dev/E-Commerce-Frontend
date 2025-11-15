import FilterSection from "../../components/categoriesComponent/FilterSection";
import ResultSection from "../../components/categoriesComponent/ResultSection";
import MainLayout from "../../components/layout/MainLayout";

function Categories() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
  <MainLayout>
    <div className="w-full px-4 lg:px-6 min-h-screen flex flex-col lg:flex-row gap-6 py-6">

      {/* SIDEBAR AREA */}
      <div className="w-full lg:w-[260px] shrink-0">
        <FilterSection />
      </div>

      {/* RESULTS AREA */}
      <div className="flex-1 w-full">
        <ResultSection />
      </div>

    </div>
  </MainLayout>
</div>
  );
}

export default Categories;
