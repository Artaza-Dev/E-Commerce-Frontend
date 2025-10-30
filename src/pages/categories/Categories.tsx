import FilterSection from "../../components/categoriesComponent/FilterSection"
import ResultSection from "../../components/categoriesComponent/ResultSection"
import MainLayout from "../../components/layout/MainLayout"
function Categories() {
  return (
    <>
        <MainLayout>
      <div className="w-full min-h-screen bg-gray-100 flex flex-col lg:flex-row p-4 sm:p-6 md:p-8 gap-4">
        {/* 🔹 Filter Section (Sidebar + Mobile toggle inside it) */}
        <FilterSection />

        {/* 🔹 Result Section */}
        <div className="flex-1">
          <ResultSection />
        </div>
      </div>
    </MainLayout>
    </>
  )
}

export default Categories