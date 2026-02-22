"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import ProductCard from "../shared/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import GlobalError from "../shared/GlobalError";
import EmptyState from "../shared/EmptyState";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";

export default function YouMayAlsoLikeSection() {
  const { data: products, loading, error, refetch } = useProducts();
  const swiperRef = useRef<SwiperType | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (loading) return <ProductCardSkeleton />;
  if (error) return <GlobalError message={error} onRetry={refetch} />;
  if (!products?.length)
    return <EmptyState title="No Products" description="Check back later." />;

  return (
    <section className="w-full my-4 md:my-20 lg:my-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-gray-900">
          You may also like
        </h2>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className="w-12 h-12 rounded-full border border-gray-300 bg-gray-900 text-white flex items-center cursor-pointer justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/*
        ─── MOBILE (< 768px) ───────────────────────────────────────────────
        Grid: 2 columns × 2 rows = 4 cards per "page", swipe horizontally
        Each swipe moves a full "page" of 4 cards.

        ─── TABLET (768px–1023px) ──────────────────────────────────────────
        Single row, 3 cards visible

        ─── DESKTOP (≥ 1024px) ─────────────────────────────────────────────
        Single row, 4 cards visible
      */}
      <Swiper
        modules={[Pagination, Grid]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavState(swiper);
        }}
        onSlideChange={(swiper) => updateNavState(swiper)}
        pagination={{
          clickable: true,
          dynamicBullets: true, // ← shows max ~5 dots, rest are hidden — clean!
        }}
        // Mobile: 2-col × 2-row grid
        grid={{ rows: 2, fill: "row" }}
        slidesPerView={2}
        spaceBetween={12}
        breakpoints={{
          // Tablet: back to single row, 3 cards
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
            grid: { rows: 1, fill: "row" },
          },
          // Desktop: single row, 4 cards
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
            grid: { rows: 1, fill: "row" },
          },
        }}
        className="you-may-also-like-swiper w-full pb-10!"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* ── Pagination wrapper ─────────────────────────────── */
      `}</style>
    </section>
  );
}
