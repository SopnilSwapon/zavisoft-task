"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { TProduct } from "@/types";

export default function ProductCard(product: TProduct) {
  return (
    <div className="flex flex-col">
      {/* Product Card */}
      <Card className="bg-[#ECEDEF] border-6 border-white shadow-none rounded-2xl p-4">
        <span className=" bg-[#4A69E2] -ml-4 w-19 h-9 -mt-4 flex justify-center items-center text-center text-white text-[12px] font-semibold py-1 rounded-br-[16px] rounded-tl-[16px] z-10">
          New
        </span>
        <Image
          src={product.images[0]}
          alt={product.title}
          width={220}
          height={160}
          className="object-contain w-full h-full rounded-lg"
        />
      </Card>

      {/* Product Name */}
      <h3 className="text-gray-900 font-extrabold uppercase text-sm  mt-3 mb-3">
        {product.title.split(" ").length > 4
          ? product.title.split(" ").slice(0, 4).join(" ") + "..."
          : product.title}
      </h3>

      {/* View Product Button */}
      <Link
        href={`/products/${product.id}`}
        className="w-full bg-black hover:bg-[#222] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 py-3 rounded-md transition-colors duration-200"
      >
        View Product – <span className="text-[#FFA52F]">${product.price}</span>
      </Link>
    </div>
  );
}
