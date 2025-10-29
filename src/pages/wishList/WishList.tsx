import MainLayout from "../../components/layout/MainLayout"
import WishProducts from "../../components/wishListComponent/WishProducts"
function WishList() {
  return (
    <>
     <div className="w-full min-h-screen">
        <MainLayout>
            <WishProducts/>
        </MainLayout>
      </div>
    </>
  )
}

export default WishList