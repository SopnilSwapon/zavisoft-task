"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import "swiper/css";

const categories = [
  {
    id: 1,
    name: "Lifestyle\nShoes",
    image: "/images/cat-lifestyle.png",
    href: "#",
  },
  {
    id: 2,
    name: "Basketball\nShoes",
    image: "/images/cat-basketball.png",
    href: "#",
  },
  {
    id: 3,
    name: "Running\nShoes",
    image: "/images/cat-running.png",
    href: "#",
  },
  {
    id: 4,
    name: "Outdoor\nShoes",
    image: "/images/cat-outdoor.png",
    href: "#",
  },
];

export default function CategoriesSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="w-full bg-[#1a1a1a] rounded-2xl pl-16 pt-8 pb-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-5xl md:text-6xl xl-text-[74px] font-semibold uppercase tracking-tight text-white">
          Categories
        </h2>
        <div className="flex items-center gap-2 pr-20">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors duration-200
              ${isBeginning
                ? "bg-[#2e2e2e] text-white/30 cursor-not-allowed"
                : " text-black bg-white cursor-pointer"
              }`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors duration-200
              ${isEnd
                ? "bg-[#2e2e2e] text-white/30 cursor-not-allowed"
                : " text-black bg-white cursor-pointer"
              }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        className="rounded-l-4xl rounded-b-none bg-white"
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        spaceBetween={16}
        breakpoints={{
          0:   { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <a
              href={cat.href}
              className="block rounded-t-2xl overflow-hidden group"
            >
              {/* Shoe Image */}
              <div className="relative w-full h-48 md:h-56">
                <Image
                  src={cat.image}
                  alt={cat.name.replace("\n", " ")}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bottom label */}
              <div className="flex items-end justify-between px-4 py-4">
                <h3 className="text-gray-900 font-extrabold uppercase text-base md:text-lg leading-tight whitespace-pre-line">
                  {cat.name}
                </h3>
                <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                  <ArrowUpRight size={16} className="text-white" />
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}