"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export type TShoe = {
  id: number;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
  href?: string;
}

interface IShoeCardProps {
  shoe: TShoe;
}

export default function ShoeCard({ shoe }: IShoeCardProps) {
  return (
    <div className="flex flex-col">
      {/* Shadcn Card for image */}
      <Card className="bg-[#ECEDEF] border-6 border-white shadow-none rounded-2xl p-4">
        {shoe.isNew && (
          <span className=" bg-[#4A69E2] -ml-4 w-19 h-9 -mt-4 flex justify-center items-center text-center text-white text-[12px] font-semibold py-1 rounded-br-[16px] rounded-tl-[16px] z-10">
            New
          </span>
        )}
        <Image
          src={shoe.image}
          alt={shoe.name}
          width={220}
          height={160}
          className="object-contain w-full h-full"
        />
      </Card>

      {/* Shoe Name */}
      <h3 className="text-gray-900 font-extrabold uppercase text-sm leading-tight mt-3 mb-3">
        {shoe.name}
      </h3>

      {/* View Product Button */}
      <Link
        href={shoe.href ?? "#"}
        className="w-full bg-black hover:bg-[#222] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 py-3 rounded-md transition-colors duration-200"
      >
        View Product –{" "}
        <span className="text-[#4A69E2]">${shoe.price}</span>
      </Link>
    </div>
  );
}