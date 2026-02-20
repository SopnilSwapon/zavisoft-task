import BannerImageSection from "./components/home/BannerImagesSec";
import CategoriesSection from "./components/home/CategoriesSec";
import ReviewsSection from "./components/home/ReviewSection";
import AppButton from "./components/shared/AppButton";
import ShoeCard, { TShoe } from "./components/shared/ShoeCard";


const shoes: TShoe[] = [
  {
    id: 1,
    name: "Adidas 4DFWD X Parley Running Shoes",
    price: 125,
    image: "/images/product-1.png",
    isNew: true,
    href: "#",
  },
  {
    id: 2,
    name: "Adidas 4DFWD X Parley Running Shoes",
    price: 125,
    image: "/images/product-2.png",
    isNew: true,
    href: "#",
  },
  {
    id: 3,
    name: "Adidas 4DFWD X Parley Running Shoes",
    price: 125,
    image: "/images/product-3.png",
    isNew: true,
    href: "#",
  },
  {
    id: 4,
    name: "Adidas 4DFWD X Parley Running Shoes",
    price: 125,
    image: "/images/product-4.png",
    isNew: true,
    href: "#",
  },
];
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
        {/* Shoes Card */}
          <section className="w-full py-10">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-5xl md:text-6xl xl-text-[74px] my-16 font-semibold uppercase tracking-tight text-gray-900">
                  Don’t miss out <br /> new drops
                </h2>
               <AppButton title="SHOP NEW DROPS"/>
              </div>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {shoes.map((shoe) => (
        <ShoeCard key={shoe.id} shoe={shoe} />
      ))}
    </div>
    </section>
        {/* Categories section */}
         <CategoriesSection/>
        {/* Review Section */}
        <ReviewsSection/>
      </main>
    </div>
  );
}