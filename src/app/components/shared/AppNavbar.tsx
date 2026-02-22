"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ImCancelCircle } from "react-icons/im";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CardContext";

export default function AppNavbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { cart } = useCart();

  return (
    <nav className="fixed max-w-330 w-full md:h-16 xl:h-24 h-13 top-4 md:top-6 xl:top-8 z-50">
      <nav className="text-[15px] w-full bg-[#FFFFFF] border p-4 md:p-6 xl:p-8 border-[#adadad33] rounded-xl mx-auto flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <ImCancelCircle size={28} /> : <IoMdMenu size={28} />}
        </button>
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-10 items-center">
          <Link
            href="/"
            className="hover:text-gray-900 text-[16px] text-[#232321] font-semibold"
          >
            New Drops 🔥
          </Link>

          <div className="relative">
            <Link
              href="/"
              className="flex items-center hover:text-gray-900 text-[16px] text-[#232321] font-semibold cursor-pointer"
            >
              Men <MdOutlineArrowDropDown size={24} />
            </Link>
          </div>

          <div className="relative">
            <Link
              href="/"
              className="flex items-center hover:text-gray-900 text-[16px] text-[#232321] font-semibold cursor-pointer"
            >
              Women <MdOutlineArrowDropDown size={24} />
            </Link>
          </div>
        </div>
        {/* Center brand logo */}
        <Link href="/" className="">
          <Image
            src="/images/kick_logo.png"
            alt="Kicks Logo"
            width={128}
            height={32}
          />
        </Link>
        {/* Left side  */}
        <div className="flex items-center gap-6 md:gap-10">
          <div className="relative hidden md:flex">
            <Input type="text" className="pl-4 border-none shadow-none" />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-xl" />
          </div>

          <div className="text-xl cursor-pointer">
            <FaUser />
          </div>

          <Button className="bg-[#FFA52F] hover:bg-yellow-500 text-black text-[16px] rounded-full w-10 h-10 p-0">
            {cart.items}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white shadow px-6 py-4 flex flex-col space-y-4">
          <Link
            href="/"
            className="hover:text-gray-900 text-[16px] text-[#232321] font-semibold"
          >
            New Drops 🔥
          </Link>
          <Link
            href="/"
            className="hover:text-gray-900 flex text-[16px] text-[#232321] font-semibold"
          >
            Men <MdOutlineArrowDropDown size={24} />
          </Link>
          <Link
            href="/"
            className="hover:text-gray-900 flex text-[16px] text-[#232321] font-semibold"
          >
            Women <MdOutlineArrowDropDown size={24} />
          </Link>
        </div>
      )}
    </nav>
  );
}
