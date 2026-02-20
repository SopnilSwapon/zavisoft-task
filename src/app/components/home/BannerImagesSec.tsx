"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const thumbnails = [
  {
    id: 1,
    src: "/images/nike-thumb-1.jpg",
    alt: "Nike Air Max side view",
  },
  {
    id: 2,
    src: "/images/nike-thumb-2.jpg",
    alt: "Nike Air Max back view",
  },
];

export default function BannerImageSection() {
  return (
    <section className="relative w-full rounded-2xl overflow-hidden">
      {/* Main Background Image */}
      <div className="relative w-full h-[480px] md:h-[560px]">
        <Image
          src="/images/nike-banner.jpg"
          alt="Nike Air Max Banner"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        {/* Vertical rotated label - top left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <div
            className="bg-black/80 text-white text-[10px] font-medium tracking-widest uppercase px-2 py-4"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Nike product of the year
          </div>
        </div>

        {/* Bottom left content */}
        <div className="absolute bottom-10 left-10 max-w-xs">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold uppercase leading-tight mb-3">
            Nike Air Max
          </h2>
          <p className="text-white/80 text-sm mb-6 leading-relaxed">
            Nike introducing the new air max for everyone&apos;s comfort
          </p>
          <Button
            variant="outline"
            className="bg-transparent border-2 border-[#4A69E2] text-white hover:bg-[#4A69E2] hover:text-white uppercase text-xs font-bold tracking-widest px-6 py-2 rounded-none transition-colors duration-300"
          >
            Shop Now
          </Button>
        </div>

        {/* Right side thumbnails */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {thumbnails.map((thumb) => (
            <button
              key={thumb.id}
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-white/30 hover:border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Image
                src={thumb.src}
                alt={thumb.alt}
                fill
                className="object-cover object-center"
              />
              {/* slight dark overlay */}
              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}