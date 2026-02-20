import BannerImageSection from "./components/home/BannerImagesSec";
import CategoriesSection from "./components/home/CategoriesSec";
import ReviewsSection from "./components/home/ReviewSection";
import Navbar from "./components/shared/Navbar";

export default function Home() {
  return (
    <div >
    
      <main className="mt-22 xl:mt-36">
        {/* Banner Title */}
        <h1 className="uppercase font-bold text-[60px] sm:text-7xl md:text-9xl xl:text-[212px] flex justify-between w-full">
          <span>Do</span>
          <span>it</span>
          <span className="text-[#4A69E2]">right</span>
        </h1>
        {/* Banner images section */}
        <BannerImageSection/>
        {/* Categories section */}
         <CategoriesSection/>
        {/* Review Section */}
        <ReviewsSection/>
      </main>
    </div>
  );
}