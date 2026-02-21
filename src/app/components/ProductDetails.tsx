"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ChevronLeft } from "lucide-react";
import { useProduct } from "@/hooks/useProduct";
import EmptyState from "./shared/EmptyState";
import GlobalError from "./shared/GlobalError";

interface ProductDetailPageProps {
  productId: number;
}

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
          <div className="space-y-2 mt-2">
            <div className="h-4 w-36 bg-gray-300 rounded" />
            <div className="h-4 w-full bg-gray-300 rounded" />
            <div className="h-4 w-5/6 bg-gray-300 rounded" />
          </div>
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

export default function ProductDetailPage({
  productId,
}: ProductDetailPageProps) {
  const { data: product, loading, error } = useProduct(productId);

  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].id);
  const [selectedSize, setSelectedSize] = useState<number | null>(38);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <GlobalError message={error} />;
  if (!product)
    return <EmptyState title="No Products" description="Check back later." />;

  const images = [
    product.images[0],
    product.images[1] ?? product.images[0],
    product.images[2] ?? product.images[0],
    product.images[0],
  ];

  return (
    <div className="min-h-screen bg-[#e8e4de] p-4 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => history.back()}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-6 group"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-0.5 transition-transform duration-150"
          />
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-6 xl:gap-10">
          {/* LEFT: 2×2 Image Grid */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            {images.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square rounded-2xl overflow-hidden bg-[#d8d3cc] transition-all duration-200
                  ${
                    activeImage === idx
                      ? "ring-2 ring-black ring-offset-2 ring-offset-[#e8e4de]"
                      : "hover:opacity-90"
                  }`}
              >
                <Image
                  src={src}
                  alt={`${product.title} view ${idx + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>

          {/* RIGHT: Product Details */}
          <div className="w-full lg:w-[360px] xl:w-[420px] flex flex-col">
            <span className="inline-flex items-center self-start px-3 py-1 rounded-full bg-[#4a7dff] text-white text-xs font-semibold tracking-wide mb-4">
              New Release
            </span>

            <h1 className="text-[22px] md:text-2xl font-extrabold uppercase tracking-tight text-gray-900 leading-tight mb-3">
              {product.title}
            </h1>

            <p className="text-2xl font-bold text-[#4a7dff] mb-5">
              ${product.price.toFixed(2)}
            </p>

            {/* Color */}
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
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
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Size
                </p>
                <button className="text-xs font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors">
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
                      className={`w-12 h-10 rounded-lg text-sm font-semibold transition-all duration-150
                        ${
                          oos
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed line-through"
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
              <button className="flex-1 h-12 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-gray-700 transition-colors duration-200 active:scale-[0.98]">
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted((v) => !v)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-200 active:scale-95
                  ${isWishlisted ? "bg-red-50 border-red-400" : "bg-white border-gray-200 hover:border-gray-400"}`}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={18}
                  className={
                    isWishlisted ? "fill-red-400 text-red-400" : "text-gray-500"
                  }
                />
              </button>
            </div>

            <button className="w-full h-12 bg-[#4a7dff] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-[#3a6df0] transition-colors duration-200 active:scale-[0.98] mb-6">
              Buy It Now
            </button>

            {/* About */}
            <div className="border-t border-gray-200 pt-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
                About the Product
              </p>
              <p className="text-sm text-gray-500 font-medium mb-2">
                {product.category.name}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {product.description}
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                  Pay over time in interest-free installments with Affirm,
                  Klarna or Afterpay.
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
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
