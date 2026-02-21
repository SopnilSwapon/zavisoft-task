"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import "swiper/css";
import { useCategories } from "@/hooks/useCategories";
import Link from "next/link";

// ── Skeleton card shown while loading ──────────────────────────────────────
function CategorySkeleton() {
  return (
    <div className="rounded-t-2xl overflow-hidden animate-pulse">
      <div className="w-full h-48 md:h-56 bg-gray-200" />
      <div className="flex items-end justify-between px-4 py-4">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
}

export default function CategoriesSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const { data: categories, loading, error } = useCategories();

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
      <div className="flex items-center gap-4 justify-between mb-6">
        <h2 className="text-3xl  md:text-6xl xl:text-[74px] py-2 md:py-4 lg:py-6 font-semibold uppercase tracking-tight text-white">
          Categories
        </h2>
        <div className="flex items-center gap-2 pr-20">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning || loading}
            className={`w-12 h-12 rounded-md flex items-center justify-center transition-colors duration-200
              ${
                isBeginning || loading
                  ? "bg-[#2e2e2e] text-white/30 cursor-not-allowed"
                  : "text-black bg-white cursor-pointer"
              }`}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd || loading}
            className={`w-12 h-12 rounded-md flex items-center justify-center transition-colors duration-200
              ${
                isEnd || loading
                  ? "bg-[#2e2e2e] text-white/30 cursor-not-allowed"
                  : "text-black bg-white cursor-pointer"
              }`}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* ── LOADING STATE ---*/}
      {loading && (
        <div className="rounded-l-4xl bg-white grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <CategorySkeleton key={i} />
          ))}
        </div>
      )}

      {/* ── ERROR STATE ──*/}
      {!loading && error && (
        <div className="rounded-l-4xl bg-white flex flex-col items-center justify-center py-16 gap-3">
          <span className="text-4xl">⚠️</span>
          <p className="text-red-500 font-medium text-sm text-center max-w-xs">
            {error}
          </p>
        </div>
      )}

      {/* ── EMPTY STATE ───*/}
      {!loading && !error && categories?.length === 0 && (
        <div className="rounded-l-4xl bg-white flex flex-col items-center justify-center py-16 gap-3">
          <span className="text-4xl">📭</span>
          <p className="text-gray-400 text-sm">No categories available.</p>
        </div>
      )}

      {/* ── All categories data ─--*/}
      {!loading && !error && categories && categories.length > 0 && (
        <Swiper
          modules={[Navigation]}
          className="rounded-l-4xl rounded-b-none bg-white"
          onSwiper={handleSwiper}
          onSlideChange={handleSlideChange}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <Link
                href="#"
                className="block rounded-t-2xl overflow-hidden group"
              >
                {/* Category Image */}
                <div className="relative">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={600}
                    height={100}
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom label */}
                <div className="flex items-end justify-between px-6 pb-6">
                  <h3 className="text-gray-900 font-extrabold uppercase text-base md:text-4xl leading-tight">
                    {cat.name}
                  </h3>
                  <div className="w-12 h-12 mr-4 bg-black rounded-md flex items-center justify-center">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
