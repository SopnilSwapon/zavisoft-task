"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import AppButton from "../shared/AppButton";

const thumbnails = [
  {
    id: 1,
    src: "/images/Rectangle 1 (1).png",
    alt: "Nike Air Max side view",
  },
  {
    id: 2,
    src: "/images/Rectangle 2.png",
    alt: "Nike Air Max back view",
  },
];

export default function BannerImageSection() {
  return (
    <section className="relative w-full rounded-[64px] overflow-hidden">
      {/* Main Background Image */}
      <div className="relative w-full h-145 md:h-187.5">
        <Image
          src="/images/image 14.png"
          alt="Nike Air Max Banner"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Dark overlay for text readability */}

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
        <div className="absolute bottom-12 left-10 max-w-xl">
          <h2 className="text-white text-2xl md:text-5xl font-extrabold uppercase  mb-3">
            Nike Air Max
          </h2>
          <p className="text-white/80 text-sm md:text-base font-medium mb-6 ">
            Nike introducing the new air max <br /> for everyone&apos;s comfort
          </p>
          <AppButton title="Shop Now" />
        </div>

        {/* Right side thumbnails */}
        <div className="absolute right-6 bottom-10 flex flex-col gap-4">
          {thumbnails.map((thumb) => (
            <button
              key={thumb.id}
              className="relative rounded-2xl w-20 h-20 md:w-40  md:h-40 overflow-hidden hover:border-white transition-all duration-300 hover:scale-105"
            >
              <Image src={thumb.src} alt={thumb.alt} height={160} width={160} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
