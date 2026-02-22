"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useProduct } from "@/hooks/useProduct";
import EmptyState from "../shared/EmptyState";
import GlobalError from "../shared/GlobalError";
import AppButton from "../shared/AppButton";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { useCart } from "@/context/CardContext";
import { navigate } from "next/dist/client/components/segment-cache/navigation";
import { useRouter } from "next/navigation";

interface IProps {
  productId: number;
}

// Skeleton component to show while loading product details
function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#e8e4de] p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 animate-pulse">
        <div className="flex-1 grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-300 rounded-2xl aspect-square" />
          ))}
        </div>
        <div className="w-full lg:w-95 xl:w-[420px] flex flex-col gap-5">
          <div className="h-6 w-24 bg-gray-300 rounded-full" />
          <div className="space-y-3">
            <div className="h-8 w-3/4 bg-gray-300 rounded-lg" />
            <div className="h-8 w-1/2 bg-gray-300 rounded-lg" />
          </div>
          <div className="h-7 w-28 bg-gray-300 rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-12 bg-gray-300 rounded" />
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-8 bg-gray-300 rounded" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-12 h-10 bg-gray-300 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <div className="flex-1 h-12 bg-gray-300 rounded-xl" />
            <div className="w-12 h-12 bg-gray-300 rounded-xl" />
          </div>
          <div className="h-12 bg-gray-300 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

const COLOR_OPTIONS = [
  { id: "navy", bg: "#2d3f5e" },
  { id: "green", bg: "#4a5e45" },
];

const SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
const OUT_OF_STOCK = [39, 40];

export default function ProductDetailPage({ productId }: IProps) {
  const { data: product, loading, error } = useProduct(productId);

  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].id);
  const [selectedSize, setSelectedSize] = useState<number | null>(38);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const { setCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    setCart((prev) => ({
      items: prev.items + 1,
      price: prev.price + (product?.price || 0),
      images: [...prev.images, product?.images[0] || ""],
      title: product?.title || "",
      description: product?.description || "",
    }));
  };
  if (loading) return <ProductDetailSkeleton />;
  if (error) return <GlobalError message={error} />;
  if (!product)
    return <EmptyState title="No Products" description="Check back later." />;

  // Always ensure 4 images
  const images = [
    product.images[0],
    product.images[1] ?? product.images[0],
    product.images[2] ?? product.images[0],
    product.images[0],
  ];

  return (
    <div className="pt-4 md:pt-6">
      <div className="mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-10">
          {/* ─── LEFT: Images ─────────────────────────────────────────── */}

          {/* MOBILE ONLY: Main swiper + thumbnails row */}
          <div className="flex-1 lg:hidden">
            {/* Main image swiper */}
            <Swiper
              modules={[Pagination, Thumbs]}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              pagination={{ clickable: true }}
              loop={false}
              className="product-detail-main-swiper w-full rounded-3xl overflow-hidden bg-[#d8d3cc]"
              style={{ aspectRatio: "1 / 1" }}
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative  w-full h-full">
                    <Image
                      src={src}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail strip */}
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              spaceBetween={8}
              watchSlidesProgress
              className="product-detail-thumbs-swiper mt-3"
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#d8d3cc] cursor-pointer border-2 border-transparent in-[.swiper-slide-thumb-active]:border-gray-900 transition-all duration-150">
                    <Image
                      src={src}
                      alt={`Thumb ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* DESKTOP ONLY: Original 2×2 grid — untouched */}
          <div className="hidden lg:grid flex-1 grid-cols-2 gap-3">
            {images.map((src, idx) => (
              <div
                key={idx}
                className={`relative border
                  ${idx === 0 ? "rounded-tl-[48px]" : ""}
                  ${idx === 1 ? "rounded-tr-[48px]" : ""}
                  ${idx === 2 ? "rounded-bl-[48px]" : ""}
                  ${idx === 3 ? "rounded-br-[48px]" : ""}
                  overflow-hidden bg-[#d8d3cc] transition-all duration-200`}
              >
                <Image
                  src={src}
                  alt={`${product.title} view ${idx + 1}`}
                  width={400}
                  height={500}
                  className="object-container w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* ─── RIGHT: Product Details (unchanged) ───────────────────── */}
          <div className="w-full lg:w-90 xl:w-105 flex flex-col">
            <span className="inline-flex items-center self-start px-4 py-3 rounded-2xl bg-[#4a7dff] text-white text-xs font-semibold tracking-wide mb-4">
              New Release
            </span>

            <h1 className="text-xl md:text-[32px] font-extrabold uppercase tracking-tight text-gray-900 leading-tight mb-3">
              {product.title}
            </h1>

            <p className="md:text-2xl text-[18px] font-bold text-[#4a7dff] mb-5">
              ${product.price.toFixed(2)}
            </p>

            {/* Color */}
            <div className="mb-5">
              <p className="md:text-[16px] font-semibold uppercase mb-2">
                Color
              </p>
              <div className="flex items-center gap-2">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-8 h-8 rounded-full transition-all duration-150
                      ${
                        selectedColor === color.id
                          ? "ring-2 ring-gray-900 ring-offset-2 ring-offset-[#e8e4de]"
                          : "hover:scale-110"
                      }`}
                    style={{ backgroundColor: color.bg }}
                    aria-label={`Color ${color.id}`}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[16px] font-semibold uppercase">Size</p>
                <button className="text-[14px] font-medium underline uppercase underline-offset-2 hover:text-gray-600 transition-colors">
                  Size Chart
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => {
                  const oos = OUT_OF_STOCK.includes(size);
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      disabled={oos}
                      onClick={() => !oos && setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg text-[14px] font-medium
                        ${
                          oos
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : active
                              ? "bg-gray-900 text-white"
                              : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
                        }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 mb-3">
              <AppButton
                title="Add to Cart"
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white text-center uppercase hover:bg-gray-800"
              />
              <button
                onClick={() => setIsWishlisted((v) => !v)}
                className={`w-14 h-14 rounded-xl flex items-center cursor-pointer justify-center border-2 transition-all duration-200 active:scale-95
                  ${isWishlisted ? "bg-red-50 border-red-400" : "bg-gray-900 text-white hover:border-red-400"}`}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={18}
                  className={
                    isWishlisted ? "fill-red-400 text-red-400" : "text-white"
                  }
                />
              </button>
            </div>

            <AppButton
              title="Buy It Now"
              onClick={() =>
                router.push(`/products/${product.id}/buy-products`)
              }
              className="w-full text-center uppercase cursor-pointer"
            />

            {/* About */}
            <div className="border-t border-gray-200 pt-6 mt-4">
              <p className="text-[16px] font-semibold uppercase mb-2">
                About the Product
              </p>
              <p className="text-[16px] text-[#5d5d5b] mb-4">
                {product.category.name}
              </p>
              <p className="text-[16px] text-[#5d5d5b] mb-6">
                {product.description}
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-[16px] text-[#5d5d5b] mb-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  Pay over time in interest-free installments with Affirm,
                  Klarna or Afterpay.
                </li>
                <li className="flex items-start gap-2 text-[16px] text-[#5d5d5b]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  Join adiClub to get unlimited free standard shipping, returns,
                  &amp; exchanges.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
